export const EMPLOYEE_MESSAGE = {
  CREATED: "Create employee successful!",
  UPDATED: "Update employee successful!",
  DELETED: "Delete employee successful!",
};

export const EMPLOYEE_ERROR_MESSAGE = {
  NOT_FOUND: `Can't find employee`,
  NOT_ID: function (id?: string) {
    return `Can't find employee with id ${id}`;
  },
  REPEATED_EMAIL: "The email is used",
};
