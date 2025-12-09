import { Controller, Get, Param, Render, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { BlogService } from './blog.service';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Get('health')
  health() {
    return 'OK';
  }

  @Get('rss.xml')
  rss(@Res() res: Response) {
    const xml = this.blogService.generateRss();
    res.set('Content-Type', 'text/xml');
    res.send(xml);
  }

  @Get('sitemap.xml')
  sitemap(@Res() res: Response) {
    const xml = this.blogService.generateSitemap();
    res.set('Content-Type', 'text/xml');
    res.send(xml);
  }

  @Get()
  @Render('blog-index')
  root(@Query('page') page: string) {
    const pageNum = page ? parseInt(page, 10) : 1;
    const result = this.blogService.findAll(pageNum);
    
    // Calculate pagination logic for the view
    const pages = [];
    for (let i = 1; i <= result.totalPages; i++) {
      pages.push({
        number: i,
        isActive: i === result.currentPage,
        url: `/blog?page=${i}`
      });
    }

    return {
      ...result,
      pages,
      hasPrevious: result.currentPage > 1,
      hasNext: result.currentPage < result.totalPages,
      previousUrl: `/blog?page=${result.currentPage - 1}`,
      nextUrl: `/blog?page=${result.currentPage + 1}`,
      title: 'Blog - Reflections & Insights | Jamanudeen P',
      description: 'Thoughts on entrepreneurship, sustainability, and building a business that truly serves people'
    };
  }

  @Get(':slug')
  @Render('blog-post')
  findOne(@Param('slug') slug: string) {
    const post = this.blogService.findOne(slug);
    return {
      post,
      title: `${post.title} - Jamanudeen P`,
      description: post.teaser
    };
  }
}
