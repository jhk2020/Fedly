import React, { Component } from 'react';

export default class News extends Component {
  constructor () {
    super();
    this.state = {
      articles: []
    };
  }

  render() {
    let articles = this.state.articles.map((article, index) => {
      return (
        <div className='article'>
          <a className='articleTitle' key={index} href={article.originId} target='_blank'>
            {article.title}
          </a>
          <p className='articleSummary'>{article.summary.content}</p>
          <br/>
          <hr/>
        </div>
      )
    });

    return (
      <div id='container'>
        <div id='articlesContainer'>
          {articles}
        </div>
      </div>
    )
  }

  componentDidMount() {
    $.get('http://cloud.feedly.com/v3/streams/contents?streamId=feed%2Fhttp%3A%2F%2Fqz.com%2Frss&count=15')
      .then((res) => {
        this.setState({articles: res.items});
      });
  }
}
