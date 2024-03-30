 
import SelectDropdown from 'react-native-select-dropdown';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Picker,ScrollView } from 'react-native';


const Options = () => {

    const [comments, setComments] = useState([]);
    const [posts, setPosts] = useState([]);
    const [postTitles, setPostTitles] = useState([]);
    const [postid,setpostid]=useState();
    const [filteredComments, setFilteredComments] = useState([]);
    const [selectedPostBody, setSelectedPostBody] = useState('');

    useEffect(() => {
      fetchPosts();
      fetchComments();
    },[]);

    const fetchComments = async () => {

        try {
      
          const response = await fetch('https://jsonplaceholder.typicode.com/comments');
          const data = await response.json();
          const slicedComments = data.slice(0, 100);
          setComments(slicedComments);

        } catch (error) {
          console.error('Error fetching comments:', error);
        }
    };

    const fetchPosts = async () => {
        try {
          const response = await fetch('https://jsonplaceholder.typicode.com/posts');
          const data = await response.json();
          setPosts(data);
          const titles = data.map(post => post.title);
          setPostTitles(titles);
          
        } catch (error) {
          console.error('Error fetching posts:', error);
        }
    };

    const filterCommentsByPostId = (commentsData, postId) => {
      
        setFilteredComments(null);
        const filtered = commentsData.filter(comment => comment.postId === postId);
        setFilteredComments(filtered);
    };

    return (
    <>

      <View style={styles.container}>
        <SelectDropdown 

            data={posts}
            onSelect={(selectedItem, index) => {

                setpostid(selectedItem.id);
                setSelectedPostBody(selectedItem.body); 
                filterCommentsByPostId(comments, postid);
            }}

            renderButton={(selectedItem, isOpened) => {
              return (
                <View style={styles.dropdownButtonStyle}>
                  <Text style={styles.dropdownButtonTxtStyle}>
                    {(selectedItem && selectedItem.title) || 'Select your Post'}
                  </Text>
                  <Icon name={isOpened ? 'chevron-up' : 'chevron-down'} style={styles.dropdownButtonArrowStyle} />
                </View>
              );
            }}
            renderItem={(item, isSelected) => {
              return (
                <View style={{ ...styles.dropdownItemStyle, ...(isSelected && { backgroundColor: '#D2D9DF' }) }}>
                  <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
                </View>
              );
            }}
            showsVerticalScrollIndicator={false}
            dropdownStyle={styles.dropdownMenuStyle}
        />
      </View>

      <Text style={styles.postBody}>
        {selectedPostBody} 
      </Text>
    
        <FlatList

          data={filteredComments}
          renderItem={({item})=>
          <View style={styles.commentContainer}>

              <Text style={styles.commentTitle}>
                {item.name}
              </Text>
              <Text style={styles.commentEmail}>
                {item.email}
              </Text>
              
              <Text style={styles.commentBody}>
                {item.body}
              </Text>
            </View>}
            keyExtractor={(item, index) => index.toString()}
        />
      
    </>
  );
};

const styles = StyleSheet.create({
  
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdownButtonStyle: {
    marginBottom: 10,
    width: 350,
    height: 50,
    backgroundColor: '#E9ECEF',
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: '#151E26',
  },
  dropdownButtonArrowStyle: {
    fontSize: 28,
  },
  dropdownMenuStyle: {
    backgroundColor: '#E9ECEF',
    borderRadius: 8,
  },
  dropdownItemStyle: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: '#151E26',
  },

  postBody: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 10,
    marginBottom: 20,
    backgroundColor: '#EDC7B7',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },

  commentContainer: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#f9f9f9',
  },
  commentTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  commentEmail: {
    paddingBottom: 10,
    color: '#666',
    marginBottom: 5,
  },
  commentBody: {
    lineHeight: 20,
  },
});

export default Options;
