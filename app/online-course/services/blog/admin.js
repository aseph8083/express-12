'use strict';

const { uid } = require('../../helpers/uid');
const { Blog } = require('../../models/blog');

const all = async (params) => {
  try {
    const page = params.page ? parseInt(params.page) : 1;
    const limit = params.limit ? parseInt(params.limit) : 100;
    const offset = (page * limit) - limit;

    const blog = await Blog.findAll({
      limit: limit,
      offset: offset,
      order: [
        [params.order_by || 'updated_at', params.order_dir || 'DESC']
      ],
    });

    return {
      metadata: { http_code: 200, page, limit },
      data: blog
    };
  } catch (error) {
    console.error('Error: Unable to execute all Blog.admin => ', error);

    return {
      metadata: { http_code: 500 },
      error: { message: 'unable_to_handle_request' },
    };
  }
};

const create = async (params) => {
  try {
    let blog = await Blog.findOne({
      where: {
        title: params.title,
      }
    });

    if (blog) {
      return {
        metadata: { http_code: 409 },
        error: { message: 'blog_has_already' },
      };
    }

    const now = Date.now();
    blog = await Blog.create({
      id: uid(),
      created_at: now,
      updated_at: now,

      title: params.title,
      category_id: params.category_id,
      deskripsi: params.deskripsi,
    });

    return {
      metadata: { http_code: 201 },
      data: Blog,
    };
  } catch (error) {
    console.error('Error: Unable to execute create Blog.admin ', error);

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
    console.error('Error: Unable to execute show Blog.admin ', error);

    return {
      metadata: { http_code: 500 },
      error: { message: 'unable_to_handle_request' },
    };
  }
};

const update = async (id, params) => {
  try {
    // data validation
    let blog = await Blog.findOne({
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
    // data validation

    // data preparation
    const data = {
      updated_at: Date.now()
    };

    if (params['title']) {
      data['title'] = params['title'];
    }

    if (params['category_id']) {
      data['category_id'] = params['category_id'];
    }

    if (params['deskripsi']) {
      data['deskripsi'] = params['deskripsi'];
    }

    // data preparation end

    blog = await Blog.update(data);

    return {
      metadata: { http_code: 200 },
      data: blog
    };
  } catch (error) {
    console.error('Error: Unable to execute update Blog.admin ', error);

    return {
      metadata: { http_code: 500 },
      error: { message: 'unable_to_handle_request' },
    };
  }
};

const destroy = async (id) => {
  try {
    // data validation
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
    // data validation

    await Blog.destroy({
      where: { id }
    });

    return {
      metadata: { http_code: 200 },
      data: {
        message: 'record_has_been_deleted',
        blog
      }
    };
  } catch (error) {
    console.error('Error: Unable to execute destroy Blog.admin ', error);

    return {
      metadata: { http_code: 500 },
      error: { message: 'unable_to_handle_request' },
    };
  }
};

module.exports = {
  all,
  create,
  show,
  update,
  destroy
};