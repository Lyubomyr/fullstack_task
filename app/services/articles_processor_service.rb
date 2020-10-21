class ArticlesProcessorService
  SORT_FIELDS = %w(story.name name text article_type)
  SORT_ORDERS = %w(asc desc)
  GROUP_ARTICLE = %w(article_type name text)
  GROUP_STORY = 'story'
  GROUP_NONE = 'none'

  def initialize(page: 1, page_size: 25, sort_field: :name, sort_order: :desc, search_text: '', group: '')
    @page = page.to_i
    @page_size = page_size.to_i
    @sort_field = sort_field
    @sort_order = sort_order
    @search_text = search_text
    @group = group
  end

  def get_records
    articles = Article.order(order_clause)
                      .page(protected_page)
                      .per(protected_page_size)

    articles = articles.search_by_text(@search_text) if @search_text.present?

    if protected_group.present?
      { data: grouped(articles), grouped_by: protected_group }
    else
      { data: articles.includes(:story), grouped_by: nil }
    end
  end

  private

  def order_clause
    "#{field} #{order}"
  end

  def field
    return @sort_field == 'story.name' ? 'stories.name' : @sort_field if SORT_FIELDS.include?(@sort_field)

    :name
  end

  def order
    return @sort_order if SORT_ORDERS.include?(@sort_order)

    :desc
  end

  def protected_page_size
    return @page_size if @page_size >= 1 && @page_size <= 50

    25
  end

  def protected_page
    return @page if @page > 0

    1
  end

  def protected_group
    return @group if GROUP_ARTICLE.include?(@group) || GROUP_STORY == @group

    nil
  end

  def grouped(articles)
    if @group == GROUP_STORY
      articles.joins(:story).group('stories.name').select("min(articles.story_id) id, stories.name as story_name, COUNT(articles.id) as article_count, COUNT(articles.article_type) as article_type_count, (array_agg(articles.name ORDER BY articles.created_at DESC))[1] as last_created_article").reorder('stories.name')
    else
      aggregated_groups = (GROUP_ARTICLE - [@group]).map{|group| "COUNT(#{group}) as #{group}"}.join(', ')
      articles.group(@group).select("MIN(articles.id) id, COUNT(story_id) as story_count, #{@group}, #{aggregated_groups}")
    end
  end
end
