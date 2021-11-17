<template>
  <div id="containerComment">
    <div id="profile">
      <img
        alt="avatar"
        :src="opinion.author_avatar"
      />
    </div>
    <div id="topBox">
      <div id="topBoxTop">
        <span id="author">{{opinion.author}}</span>
        <span id="createdAt">{{opinion.created_at}}</span>
      </div>
      <div id="opinion">
        {{opinion.opinion}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Comment',
  props: ['opinion']
}
</script>

<style lang="scss">
@import './Comment.scss';

#containerComment {
  border-radius: 20px;
  background-color: #606060;

  display: flex;
  flex-direction: row;
  #profile {
    border-radius: 50%;
    overflow: hidden;

    display: flex;
    justify-content: center;
  }
  #topBox {
    color: white;
    #topBoxTop {
      width: 100%;
      
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
  }
}
@media (orientation: landscape) {
  #containerComment {
    margin-bottom: 20px;
    padding: 10px;
    #profile {
      width: 60px;
      height: 60px;
    }
    #topBox {
      margin-left: 10px;
      width: calc(100% - 60px);
      #topBoxTop {
        margin-bottom: 4px;
        #author {
          font-size: 16px;
        }
        #createdAt {
          font-size: 10px;
        }
      }
    }
  }
}
</style>