import React from 'react'
import { graphql } from 'gatsby'
import Disqus from 'disqus-react'
import Divider from '@material-ui/core/Divider'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { Tooltip, Typography } from '@material-ui/core'
import Image from 'gatsby-image'

import Layout from '../components/layout'
import RouterTabs from '../components/RouterTabs'
import SEO from '../components/seo'
import Bio from '../components/bio'

import '../style/friend.css'

const useStyles = makeStyles({
  friends: {
    display: 'flex',
    marginTop: '1rem',
    flexDirection: 'row'
  },
  friend: {
    margin: '0 0.5rem',
    '&:first-child': {
      marginLeft: '0'
    }
  },
  divider: {
    marginBottom: '1rem'
  },
  introduction: {
    '& img': {
      margin: 'auto'
    }
  },
  comment: {
    marginTop: '1.5rem'
  }
})

const FriendPage = (props) => {
  const { data } = props
  const theme = useTheme()
  const classes = useStyles()
  const siteTitle = data.site.siteMetadata.title
  const discusConfig = {
    url: props.url,
    identifier: 'global-comment',
    title: '评论区'
  }

  const avatars = data.avatars.edges.filter(
    avatar => /^friend/.test(avatar.node.relativePath))
    .map(avatar => avatar.node)

  return (
    <Layout location={props.location} title={siteTitle}>
      <SEO title='About'/>
      <RouterTabs
        routers={data.site.siteMetadata.menuLinks}
        currentPage='/about'
      />
      <Typography
        style={{ marginTop: '1rem' }}
        variant='h5' align='center'
      >
        My Friends
      </Typography>
      <ul className={classes.friends}>
        {data.site.siteMetadata.friendship.map(friend => {
          const image = avatars.find(
            v => new RegExp(friend.image).test(v.relativePath))
          return (
            <Tooltip key={friend.name} title={friend.name}>
              <a
                herf={friend.url}
                target='_blank'
                style={{
                  width: 50,
                  color: 'transparent'
                }}
              >
                <Image
                  className={classes.friend}
                  fluid={image.childImageSharp.fluid}
                  style={{
                    flex: 1,
                    maxWidth: 50,
                    borderRadius: '100%',
                    cursor: 'pointer'
                  }}
                  imgStyle={{
                    borderRadius: '50%'
                  }}
                />
              </a>
            </Tooltip>
          )
        })}
      </ul>
      <Divider className={classes.divider}
        light={theme.palette.type === 'light'}/>
      <Bio>
        <div className={classes.introduction}>
          <img
            alt='GitHub followers'
            src='https://img.shields.io/github/followers/himself65?label=Follow&style=social'
          />
          <br/>
          <img
            alt='Twitter Follow'
            src='https://img.shields.io/twitter/follow/himself_65?label=Follow&style=social'
          />
        </div>
      </Bio>
      <div className={classes.comment}>
        <Disqus.DiscussionEmbed shortname={process.env.GATSBY_DISQUS_NAME}
          config={discusConfig}/>
      </div>
    </Layout>
  )
}

export default FriendPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        menuLinks {
          name
          link
          icon
        }
        friendship {
          name
          url
          image
        }
      }
    }
    avatars: allFile {
      edges {
        node {
          relativePath
          name
          childImageSharp {
            fluid(maxWidth: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`
