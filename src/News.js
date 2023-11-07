import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {

  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1
    }
  }

  async componentDidMount() {
    let url = "https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=0016b10889334f3283328333705bde47&page=1";
    let data = await fetch(url);
    let parsedData = await data.json();
    // console.log(parsedData.totalResults);
    this.setState({ articles: parsedData.articles, totalArticles: parsedData.totalResults })
  }


handleNextClick = async ()=>{
  console.log("next");
  // if(this.state.page + 1 > Math.ceil(this.state.totalResults/20)){
  //   console.log("limit gyi");
  // }else {
    console.log("start");
  let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=0016b10889334f3283328333705bde47&page=$
  {this.state.page + 1}`;
  let data = await fetch(url);
  let parsedData = await data.json();
  this.setState({ 
    page: this.state.page + 1,
    articles: parsedData.articles
   })
   console.log("end");
  // }
 
}

handlePreviewClick = async ()=>{
  let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=0016b10889334f3283328333705bde47&page=$
  {this.state.page - 1}`;
  let data = await fetch(url);
  let parsedData = await data.json();
  this.setState({ 
    page: this.state.page - 1,
    articles: parsedData.articles
   })
}

  render() {
    return (
      <div className="container my-3">
        <h2>Moneky news - top headlines</h2>
        <div className="row">
          {this.state.articles.map((element) => {
            return <div className="col-md-4" key={element.urlToImage}>
              <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""}
                imageUrl={element.urlToImage?element.urlToImage:""} newsUrl={element.url} />
            </div>
          })}

        </div>
        <div className="container d-flex justify-content-between" >
        <button type="button" className="btn btn-warning" disabled={this.state.page<=1} onClick={this.handlePreviewClick}>&larr; Previous</button>
        <button type="button" className="btn btn-info" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
      </div>
    )
  }
}

export default News