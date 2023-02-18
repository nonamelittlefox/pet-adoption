export const Validate = {
  SignUp: {
    EmployeeCode: {
      Blank: '社員番号は必須です',
      Invalid: '社員番号は半角英数で入力してください',
    },
    Mail: {
      Invalid: 'メールアドレスが正しくありません',
      Blank: 'メールアドレスは必須です',
    },
  },
  Login: {
    EmployeeCode: {
      Blank: '社員番号は必須です',
      Invalid: '社員番号は半角英数で入力してください',
    },
    Password: {
      Blank: 'パスワードは必須です',
      Invalid: 'パスワードは8文字以上16文字以内で入力してください',
    },
  },
  ResetPassword: {
    EmployeeCode: {
      Blank: '社員番号は必須です',
      InvalidType: '社員番号は半角英数で入力してください',
    },
    Password: {
      NewPasswordInvalid:
        '新しいパスワード・パスワード（確認）は8文字以上16文字以内で入力してください',
      OldPasswordInvalid:
        '新しいパスワード・パスワード（確認）は8文字以上16文字以内で入力してください',
    },
  },
};
