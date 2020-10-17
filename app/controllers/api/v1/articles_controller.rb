# frozen_string_literal: true

class API::V1::ArticlesController < API::V1::BaseController
  before_action :set_article, only: [:update, :destroy]

  # GET /articles
  # GET /articles.json
  def index
    # TODO: move to service, add validations (pages in range, allowed groups, order only for existing fields)
    search_text = params[:search_text]
    group = params[:group]
    sort = params[:sort] == 'desc' ? :desc : :asc
    sort_field = params[:sort_field] || :name
    page = params[:page] || 1

    @articles = Article.includes(:story)
                       .order(sort_field == 'story_name' ? "stories.name #{sort}" : Article.arel_table[sort_field].send(sort))
                       .page(page)

    @articles = @articles.search_by_text(search_text) if search_text.present?

    # Article.joins("left join lateral (select stories.name as story_name from stories where stories.id = articles.story_id) story on true").select("articles.article_type, array_to_string(array_agg(articles.name ORDER BY articles.name), ',') as name, array_agg(articles.text) as text, array_to_string(array_agg(story.story_name ORDER BY story.story_name), ',') as story_name").group(:article_type).order(:article_type).first.story_name

    if group.present?
      agg_by_field = "array_to_string(array_agg(articles.name ORDER BY articles.name), ',') as name"
      @articles = @articles.joins("left join lateral (select stories.name as story_name from stories where stories.id = articles.story_id) story on true")
      @articles =  if group == 'article_type'
        @articles.select("articles.article_type, #{agg_name}, #{agg_text}, #{agg_story_name}").group(:article_type)
      elsif group == 'name'
        @articles.select("articles.name, #{agg_article_type}, #{agg_text}, #{agg_story_name}").group(:name)
      elsif group == 'text'
        @articles.select("articles.text, #{agg_article_type}, #{agg_name}, #{agg_story_name}").group(:text)
      end
    end
  end


  # POST /articles
  # POST /articles.json
  def create
    @article = Article.new(article_params)
    byebug
    if @article.save
      render json: @article
    else
      render json: @article.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /articles/1
  # PATCH/PUT /articles/1.json
  def update
    if @article.update(article_params)
      render json: @article
    else
      render json: @article.errors, status: :unprocessable_entity
    end
  end

  # DELETE /articles/1
  # DELETE /articles/1.json
  def destroy
    @article.destroy

    head :no_content
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_article
      @article = Article.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def article_params
      params.require(:article).permit(:name, :text, :type, :story_id)
    end

    def agg_name
      "array_to_string(array_agg(articles.name ORDER BY articles.name), ',') as name"
    end

    def agg_text
      "array_to_string(array_agg(articles.text ORDER BY articles.text), ',') as text"
    end

    def agg_article_type
      "array_to_string(array_agg(articles.article_type ORDER BY articles.article_type), ',') as article_type"
    end

    def agg_story_name
      "array_to_string(array_agg(story.story_name ORDER BY story.story_name), ',') as story_name"
    end
end
