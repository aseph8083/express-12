'use strict';

const { uid } = require('../../helpers/uid');
const { Course } = require('../../models/course');

const all = async (params) => {
  try {
    const page = params.page ? parseInt(params.page) : 1;
    const limit = params.limit ? parseInt(params.limit) : 100;
    const offset = (page * limit) - limit;

    const courses = await Course.findAll({
      limit: limit,
      offset: offset,
      order: [
        [params.order_by || 'updated_at', params.order_dir || 'DESC']
      ],
    });

    return {
      metadata: { http_code: 200, page, limit },
      data: courses
    };
  } catch (error) {
    console.error('Error: Unable to execute all course.admin => ', error);
    
    return {
      metadata: { http_code: 500 },
      error: { message: 'unable_to_handle_request' },
    };
  }
};

const create = async (params) => {
  try {
    let course = await Course.findOne({
      where: {
        name: params.name,
      }
    });

    if (course) {
      return {
        metadata: { http_code: 409 },
        error: { message: 'name_has_already_been_registered' },
      };
    }

    const now = Date.now();
    course = await Course.create({
      id: uid(),      
      created_at: now,
      updated_at: now,

      name: params.name,
      excerpt: params.excerpt,
      learn_summary: params.learn_summary,
      requirement: params.requirement,
      description: params.description,
    });

    return {
      metadata: { http_code: 201 },
      data: course,
    };
  } catch (error) {
    console.error('Error: Unable to execute create course.admin ', error);
    
    return {
      metadata: { http_code: 500 },
      error: { message: 'unable_to_handle_request' },
    };
  }
};

const show = async (id) => {
  try {
    const course = await Course.findOne({
      where: {
        id,
      }
    });

    if (!course) {
      return {
        metadata: { http_code: 404 },
        error: { message: 'record_not_found' },
      };
    }

    return {
      metadata: { http_code: 200 },
      data: course
    };
  } catch (error) {
    console.error('Error: Unable to execute show course.admin ', error);
    
    return {
      metadata: { http_code: 500 },
      error: { message: 'unable_to_handle_request' },
    };
  }
};

const update = async (id, params) => {
  try {
    // data validation
    let course = await Course.findOne({
      where: {
        id,
      }
    });

    if (!course) {
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

    if (params['excerpt']) {
      data['excerpt'] = params['excerpt'];
    }

    if (params['learn_summary']) {
      data['learn_summary'] = params['learn_summary'];
    }

    if (params['requirement']) {
      data['requirement'] = params['requirement'];
    }

    if (params['description']) {
      data['description'] = params['description'];
    }
    // data preparation end

    course = await course.update(data);

    return {
      metadata: { http_code: 200 },
      data: course
    };
  } catch (error) {
    console.error('Error: Unable to execute update course.admin ', error);
    
    return {
      metadata: { http_code: 500 },
      error: { message: 'unable_to_handle_request' },
    };
  }
};

const destroy = async (id) => {
  try {
    // data validation
    const course = await Course.findOne({
      where: {
        id,
      }
    });

    if (!course) {
      return {
        metadata: { http_code: 404 },
        error: { message: 'record_not_found' },
      };
    }
    // data validation

    await Course.destroy({
      where: { id }
    });

    return {
      metadata: { http_code: 200 },
      data: {
        message: 'record_has_been_deleted',
        course
      }
    };
  } catch (error) {
    console.error('Error: Unable to execute destroy course.admin ', error);
    
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