export interface News {
    _id: string;
    image: string;
    title: string;
    text: string;
    category: Category;
  }
  
 export interface Comments {
    _id: string;
    text: string;
    news: News;
    user: User;
  }
  
 export interface Category {
    _id: string;
    title: string;
  }
  
  export interface User {
    _id?: string;
    login: string;
    password: string;
  }
  