import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View, ActivityIndicator, Dimensions, Text, TouchableOpacity } from 'react-native';
import api from '../api/axios';
import NewsCard from '../components/NewsCard';
import { useAuth } from '../context/AuthContext';
import { LogOut, Bookmark as BookmarkIcon } from 'lucide-react-native';

const { height } = Dimensions.get('window');

const FeedScreen = ({ navigation }) => {
  const [news, setNews] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const { user, logout } = useAuth();

  const fetchNews = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const { data } = await api.get(`/news?page=${page}&limit=5`);
      setNews(prev => [...prev, ...data]);
      setPage(prev => prev + 1);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchBookmarks = async () => {
    try {
      const { data } = await api.get('/bookmarks');
      setBookmarks(data.map(b => b._id));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchNews();
    if (user) fetchBookmarks();
  }, []);

  const handleBookmark = async (newsId) => {
    if (!user) return navigation.navigate('Login');
    try {
      const { data } = await api.post(`/bookmarks/${newsId}`);
      if (data.bookmarked) {
        setBookmarks(prev => [...prev, newsId]);
      } else {
        setBookmarks(prev => prev.filter(id => id !== newsId));
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <View style={styles.container}>
      {/* Custom Header Overlay */}
      <View style={styles.header}>
        <Text style={styles.logo}>SCROLL</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity onPress={() => user ? navigation.navigate('Bookmarks') : navigation.navigate('Login')}>
            <BookmarkIcon size={24} color="#fff" />
          </TouchableOpacity>
          {user && (
            <TouchableOpacity onPress={logout}>
              <LogOut size={24} color="#fff" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <FlatList
        data={news}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <NewsCard 
            news={item} 
            onBookmark={handleBookmark}
            isBookmarked={bookmarks.includes(item._id)}
          />
        )}
        snapToInterval={height}
        snapToAlignment="start"
        decelerationRate="fast"
        onEndReached={fetchNews}
        onEndReachedThreshold={0.5}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={loading && <ActivityIndicator style={{ padding: 20 }} color="#fff" />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    zIndex: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '900',
    fontStyle: 'italic',
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 20,
  }
});

export default FeedScreen;
