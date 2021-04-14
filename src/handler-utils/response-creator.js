const getSuccessResponseWithMessage = (h, message, status = 200) => {
  const response = h.response({
    status: 'success',
    message,
  });
  response.code(status);
  return response;
};

const getFailedResponseWithMessage = (h, message, status) =>{
  const response = h.response({
    status: 'fail',
    message,
  });
  response.code(status);
  return response;
};

const getSuccessResponseWithMsgAndData = (h, message, data, status = 200) => {
  const response = h.response({
    status: 'success',
    message,
    data,
  });
  response.code(status);
  return response;
};

const getSuccessResponseWithData = (h, data, status = 200) => {
  const response = h.response({
    status: 'success',
    data,
  });
  response.code(status);
  return response;
};

module.exports = {
  getSuccessResponseWithMessage,
  getFailedResponseWithMessage,
  getSuccessResponseWithMsgAndData,
  getSuccessResponseWithData,
};
