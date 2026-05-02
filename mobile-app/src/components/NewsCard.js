import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Share } from 'react-native';
import { Bookmark, Share2 } from 'lucide-react-native';

const { height, width } = Dimensions.get('window');

const NewsCard = ({ news, onBookmark, isBookmarked }) => {
  const onShare = async () => {
    try {
      await Share.share({
        message: `${news.title}\n\n${news.summary}`,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.tag}>
          <Text style={styles.tagText}>{news.category.toUpperCase()}</Text>
        </View>
        
        <Text style={styles.title}>{news.title}</Text>
        <Text style={styles.summary}>{news.summary}</Text>
        
        <View style={styles.divider} />
        
        <Text style={styles.whyLabel}>WHY IT MATTERS</Text>
        <Text style={styles.whyText}>{news.whyItMatters}</Text>

        <View style={styles.actions}>
          <TouchableOpacity 
            onPress={() => onBookmark(news._id)}
            style={styles.actionButton}
          >
            <Bookmark size={24} color={isBookmarked ? '#3b82f6' : '#9ca3af'} fill={isBookmarked ? '#3b82f6' : 'none'} />
            <Text style={[styles.actionText, isBookmarked && { color: '#3b82f6' }]}>
              {isBookmarked ? 'Saved' : 'Bookmark'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={onShare} style={styles.actionButton}>
            <Share2 size={24} color="#9ca3af" />
            <Text style={styles.actionText}>Share</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: height,
    width: width,
    backgroundColor: '#000',
    justifyContent: 'flex-end',
    padding: 24,
    paddingBottom: 60,
  },
  content: {
    gap: 16,
  },
  tag: {
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 99,
    alignSelf: 'flex-start',
  },
  tagText: {
    color: '#000',
    fontSize: 10,
    fontWeight: '900',
  },
  title: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 38,
  },
  summary: {
    color: '#d1d5db',
    fontSize: 18,
    lineHeight: 26,
  },
  divider: {
    height: 1,
    backgroundColor: '#27272a',
    marginVertical: 8,
  },
  whyLabel: {
    color: '#71717a',
    fontSize: 12,
    fontWeight: 'bold',
  },
  whyText: {
    color: '#a1a1aa',
    fontSize: 14,
    fontStyle: 'italic',
  },
  actions: {
    flexDirection: 'row',
    gap: 24,
    marginTop: 16,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  actionText: {
    color: '#9ca3af',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default NewsCard;
