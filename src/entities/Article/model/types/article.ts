export enum ArticalBlockType {
    CODE = 'CODE',
    IMAGE = 'IMAGE',
    TEXT = 'TEXT'
}

export interface ArticleBlockBase {
    id: string
    type: ArticalBlockType
}

export interface ArticleCodeBlock extends ArticleBlockBase{
    type:ArticalBlockType.CODE
    code:string
}
export interface ArticleImageBlock extends ArticleBlockBase {
    type:ArticalBlockType.IMAGE
    title: string
    src:string
}

export interface ArticleTextBlock extends ArticleBlockBase {
    type:ArticalBlockType.TEXT
    paragraphs: string[]
    title?: string
}

export type ArticleBlock = ArticleCodeBlock | ArticleImageBlock | ArticleTextBlock

export enum ArticalType {
    IT = 'IT',
    SCIENCE = 'SCIENCE',
    ECONOMICS = 'ECONOMICS'
}

export interface Article {
    id: string
    title: string
    subtitle: string
    img: string
    views: number
    createdAt: string
    type: ArticalType[]
    blocks: ArticleBlock[]
}
