# frozen_string_literal: true

class API::V1::ArticlesController < API::V1::BaseController
  before_action :set_article, only: [:update, :destroy]

  # GET /articles
  # GET /articles.json
  def index
    # TODO: create constants, move logic to service, add validations (pages in range, allowed groups, order only for existing fields, etc)

    page = params[:page] || 1
    page_size = params[:page_size] || 25
    sort_field = params[:sort_field] || :name
    sort_order = params[:sort_order] == 'desc' ? :desc : :asc
    search_text = params[:search_text]
    group = params[:group]

    @articles = Article.includes(:story)
                       .order(sort_field == 'story.name' ? "stories.name #{sort_order}" : Article.arel_table[sort_field].send(sort_order))
                       .page(page)
                       .per(page_size)

    @articles = @articles.search_by_text(search_text) if search_text.present?
  end


  # POST /articles
  # POST /articles.json
  def create
    @article = Article.new(article_params)
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
      params.require(:article).permit(:name, :text, :article_type, :story_id)
    end
end
