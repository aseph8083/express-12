'use strict';

const { uid } = require('../../helpers/uid');
const { Category } = require('../../models/category');

const all = async (params) => {
  try {
    const page = params.page ? parseInt(params.page) : 1;
    const limit = params.limit ? parseInt(params.limit) : 100;
    const offset = (page * limit) - limit;

    const categories = await Category.findAll({
      limit: limit,
      offset: offset,
      order: [
        [params.order_by || 'updated_at', params.order_dir || 'DESC']
      ],
    });

    return {
      metadata: { http_code: 200, page, limit },
      data: categories
    };
  } catch (error) {
    console.error('Error: Unable to execute all category.admin => ', error);
    
    return {
      metadata: { http_code: 500 },
      error: { message: 'unable_to_handle_request' },
    };
  }
};

const create = async (params) => {
  try {
    let category = await Category.findOne({
      where: {
        name: params.name,
      }
    });

    if (category) {
      return {
        metadata: { http_code: 409 },
        error: { message: 'name_has_already_been_registered' },
      };
    }

    const now = Date.now();
    category = await Category.create({
      id: uid(),      
      created_at: now,
      updated_at: now,

      name: params.name,
    });

    return {
      metadata: { http_code: 201 },
      data: category,
    };
  } catch (error) {
    console.error('Error: Unable to execute create category.admin ', error);
    
    return {
      metadata: { http_code: 500 },
      error: { message: 'unable_to_handle_request' },
    };
  }
};

const show = async (id) => {
  try {
    const category = await Category.findOne({
      where: {
        id,
      }
    });

    if (!category) {
      return {
        metadata: { http_code: 404 },
        error: { message: 'record_not_found' },
      };
    }

    return {
      metadata: { http_code: 200 },
      data: category
    };
  } catch (error) {
    console.error('Error: Unable to execute show category.admin ', error);
    
    return {
      metadata: { http_code: 500 },
      error: { message: 'unable_to_handle_request' },
    };
  }
};

const update = async (id, params) => {
  try {
    // data validation
    let category = await Category.findOne({
      where: {
        id,
      }
    });

    if (!category) {
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

    if (params['name']) {
      data['name'] = params['name'];
    }
    // data preparation end

    category = await category.update(data);

    return {
      metadata: { http_code: 200 },
      data: category
    };
  } catch (error) {
    console.error('Error: Unable to execute update category.admin ', error);
    
    return {
      metadata: { http_code: 500 },
      error: { message: 'unable_to_handle_request' },
    };
  }
};

const destroy = async (id) => {
  try {
    // data validation
    const category = await Category.findOne({
      where: {
        id,
      }
    });

    if (!category) {
      return {
        metadata: { http_code: 404 },
        error: { message: 'record_not_found' },
      };
    }
    // data validation

    await Category.destroy({
      where: { id }
    });

    return {
      metadata: { http_code: 200 },
      data: {
        message: 'record_has_been_deleted',
        category
      }
    };
  } catch (error) {
    console.error('Error: Unable to execute destroy category.admin ', error);
    
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