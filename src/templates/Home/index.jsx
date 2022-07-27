import './styles.css';

import { Component } from 'react';

import { loadPosts } from '../../components/utils/load-posts';
import { Posts } from '../../components/Posts';
import { Button } from '../../components/Button';
import { TextInput } from '../../components/TextInput';

class Home extends Component {
    state = {
      posts: [],
      allPosts: [],
      page: 0,
      postsPerPage: 10,
      searchValue: '',
    };

    componentDidMount() {
      this.loadPosts();
    }

    loadPosts = async () => {
      const { page, postsPerPage } = this.state;

      const postsAndPhotos = await loadPosts();

      this.setState({
        ...this.state,
        posts: postsAndPhotos.slice(page, page + postsPerPage),
        allPosts: postsAndPhotos, 
      });
    } 

    loadMorePosts = () => {
      const {
        page,
        postsPerPage,
        allPosts,
        posts
      } = this.state;

      const nextPage = page + postsPerPage;
      const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);

      posts.push(...nextPosts);

      this.setState({ posts, page: nextPage });
    }

    handleInputChange = (event) => {
      const value = event.currentTargent.value;
      this.setState({ ...this.state, searchValue: value })
    }
  
  render() {
    const { 
      posts, 
      page, 
      postsPerPage, 
      allPosts, 
      searchValue 
    } = this.state; 
    
    const noMorePosts = page + postsPerPage >= allPosts.length;
    
    const filteredPosts = !!searchValue ?
      allPosts.filter(post => {
        return post.title.toLowerCase().includes(
          searchValue.toLowerCase()
        );
      })
      : posts;

    return (
      <section className="container">
        <div className="search-container">
          {!!searchValue && (
            <h1>Search value: {searchValue}</h1>
          )}

          <TextInput 
            actionFn={this.handleInputChange}
            inputValue={searchValue} 
          />
        </div>
        {filteredPosts.length > 0 && (
          <Posts posts={filteredPosts} />
        )}

        {filteredPosts.length === 0 && (
          <p>No posts</p>
        )}


        <div className="button-container">
          {!searchValue && (
            <Button
              text="Load more posts"
              onClick={this.loadMorePosts}
              disabled={noMorePosts}
            />
          )}
        </div>
      </section>
    );
  }
}

export default Home;
