'use strict';

const { uid } = require('../../helpers/uid');
const { Blog } = require('../../models/blog');

const all = async (params) => {
  try {
    const page = params.page ? parseInt(params.page) : 1;
    const limit = params.limit ? parseInt(params.limit) : 100;
    const offset = (page * limit) - limit;

    const blogs = await Blog.findAll({
      limit: limit,
      offset: offset,
      order: [
        [params.order_by || 'updated_at', params.order_dir || 'DESC']
      ],
    });

    return {
      metadata: { http_code: 200, page, limit },
      data: blogs
    };
  } catch (error) {
    console.error('Error: Unable to execute all blog.admin => ', error);
    
    return {
      metadata: { http_code: 500 },
      error: { message: 'unable_to_handle_request' },
    };
  }
};

const show = async (id) => {
  try {
    const blog = await Blog.findOne({
      where: {
        id,
      }
    });

    if (!blog) {
      return {
        metadata: { http_code: 404 },
        error: { message: 'record_not_found' },
      };
    }

    return {
      metadata: { http_code: 200 },
      data: blog
    };
  } catch (error) {
    console.error('Error: Unable to execute show blog.admin ', error);
    
    return {
      metadata: { http_code: 500 },
      error: { message: 'unable_to_handle_request' },
    };
  }
};


module.exports = {
  all,
  show,
};