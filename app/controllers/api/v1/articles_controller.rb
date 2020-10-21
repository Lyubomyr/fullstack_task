# frozen_string_literal: true

class API::V1::ArticlesController < API::V1::BaseController
  before_action :set_article, only: [:update, :destroy]

  # GET /articles
  # GET /articles.json
  def index
    result = ::ArticlesProcessorService.new(
      page: params[:page],
      page_size: params[:page_size],
      sort_field: params[:sort_field],
      sort_order: params[:sort_order],
      search_text: params[:search_text],
      group: params[:group]
    ).get_records

    @grouped_by = result[:grouped_by]
    @articles = result[:data]
  end


  # POST /articles
  # POST /articles.json
  def create
    @article = Article.new(article_params)
    if @article.save
      ActionCable.server.broadcast "articles_channel", content: {action: 'create'}
      render json: @article
    else
      render json: @article.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /articles/1
  # PATCH/PUT /articles/1.json
  def update
    if @article.update(article_params)
      ActionCable.server.broadcast "articles_channel", content: {action: 'update'}
      render json: @article
    else
      render json: @article.errors, status: :unprocessable_entity
    end
  end

  # DELETE /articles/1
  # DELETE /articles/1.json
  def destroy
    @article.destroy
    ActionCable.server.broadcast "articles_channel", content: {action: 'destroy'}

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
