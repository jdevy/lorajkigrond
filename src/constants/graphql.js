/* eslint-disable */
import gql from 'graphql-tag'

export const PAGE_SIZE = 10

export const LAST_DIFFUSIONS = gql`
  query diffusionsOfShowByUrl($url: String!, $first: Int!, $after: String!) {
    diffusionsOfShowByUrl(url: $url, first: $first, after: $after) {
edges {
      cursor
      node {
          id
          title
          url
          published_date
          podcastEpisode {
            url
            title
          }
      }
    }
  }
}
`

export const ALL_BRANDS = gql`
  query allBrands {
    brands {
      id
      title
      baseline
      description
      websiteUrl
    }
  }
`


export const ALL_LINKS_QUERY = gql`
  query AllLinksQuery {
    allLinks {
      id
      createdAt
      url
      description
    }
  }
`
export const CREATE_LINK_MUTATION = gql`
  mutation CreateLinkMutation($description: String!, $url: String!) {
    createLink(
      description: $description,
      url: $url,
    ) {
      id
      createdAt
      url
      description
    }
  }
`
