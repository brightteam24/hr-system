import { Box, Button, Heading, Text, VStack, Spinner } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'
import PostForm from '../components/forms/PostForm'
import PostCard from '../components/common/PostCard'
import { usePostStore } from '../store/postStore'

export default function Home() {
  const { user } = useAuth()
  const { posts, fetchPosts, hasMore, isLoading } = usePostStore()

  useEffect(() => {
    if (posts.length === 0) {
      fetchPosts()
    }
  }, [fetchPosts, posts.length])

  const handleLoadMore = () => {
    fetchPosts()
  }

  return (
    <Box maxW="800px" margin="0 auto">
      <Heading as="h1" size="lg" mb={6}>Welcome, {user?.username}!</Heading>
      <PostForm />
      <VStack spacing={4} align="stretch" mt={8}>
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
        {isLoading && <Spinner />}
        {!isLoading && hasMore && (
          <Button colorScheme='blue' onClick={handleLoadMore}>Load More</Button>
        )}
        {!isLoading && !hasMore && posts.length > 0 && (
          <Text textAlign="center" mt={4}>No more posts to load.</Text>
        )}
        {!isLoading && posts.length === 0 && (
          <Text textAlign="center" mt={4}>No Posts Yet. Be the first to create one!</Text>
        )}
      </VStack>
    </Box>
  )
}