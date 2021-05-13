import { GetStaticProps } from 'next'
import  Head  from 'next/head'
import React from 'react'
import Prismic from '@prismicio/client'
import { getPrismicClient } from '../../services/prismic'
import styles from './post.module.scss'

export default function Posts(){
  return (
    <>
      <Head>
        <title>Posts| IgNews</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.posts}>
          <a href="">
            <time>12 de marco de 2021</time>
            <strong>create ner</strong>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam fugit blanditiis quo sed aliquam? Molestiae nulla ipsam dolore reprehenderit laborum optio quisquam id cupiditate voluptatum, reiciendis, labore at, recusandae beatae?</p>
          </a>
          <a href="">
            <time>12 de marco de 2021</time>
            <strong>create ner</strong>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam fugit blanditiis quo sed aliquam? Molestiae nulla ipsam dolore reprehenderit laborum optio quisquam id cupiditate voluptatum, reiciendis, labore at, recusandae beatae?</p>
          </a>
          <a href="">
            <time>12 de marco de 2021</time>
            <strong>create ner</strong>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam fugit blanditiis quo sed aliquam? Molestiae nulla ipsam dolore reprehenderit laborum optio quisquam id cupiditate voluptatum, reiciendis, labore at, recusandae beatae?</p>
          </a>
          <a href="">
            <time>12 de marco de 2021</time>
            <strong>create ner</strong>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam fugit blanditiis quo sed aliquam? Molestiae nulla ipsam dolore reprehenderit laborum optio quisquam id cupiditate voluptatum, reiciendis, labore at, recusandae beatae?</p>
          </a>
        </div>
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps= async ()=>{

  const prismic = getPrismicClient()

  const response = await prismic.query(
  [Prismic.predicates.at('document.type','post')],{
    fetch:['post.title', 'post.content'],
    pageSize:100
  }
  )

  console.log(response);

  return {
    props:{}
  }
}



























































