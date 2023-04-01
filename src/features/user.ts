type SetUser = { type: 'user/ACTIVE', payload: string};

const setUserActive = (value: string): SetUser => ({ type: 'user/ACTIVE', payload: value });

type UnSetUser = { type: 'user/PACIVE', payload: string};

const unsetUserActive = (value: string): UnSetUser => ({ type: 'user/PACIVE', payload: value });

type Action = SetUser | UnSetUser;

const user = localStorage.getItem('appAdmin')

const userReducer = (userStore = user || '', action: Action) => {
  switch(action.type) {
    case 'user/ACTIVE':
      localStorage.setItem('appAdmin', action.payload);
      return action.payload;

    case 'user/PACIVE':
      localStorage.setItem('appAdmin', '');
      return action.payload;

    default:
      return userStore;
  }
};

export const actions = { setUserActive, unsetUserActive }

export default userReducer;