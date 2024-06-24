import { ArticleDetailsCommentsSchema, ArticleDetailsPageRecommendationsSchema } from './ArticleDetailsPage';

export interface ArticleDetailsPageSchema {
    comments : ArticleDetailsCommentsSchema
    recommendations: ArticleDetailsPageRecommendationsSchema
}
