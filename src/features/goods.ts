type SetGoods = { type: 'goods/SET', payload: Array<Object> };

const setGoods = (value: Array<Object>): SetGoods => ({ type: 'goods/SET', payload: value });

type AddGoods = { type: 'goods/ADD', payload: Array<Object> };

const addGoods = (value: Array<Object>): AddGoods => ({ type: 'goods/ADD', payload: value });

type Action = SetGoods | AddGoods;

const goodsReducer = (goods: Array<Object> = [], action: Action) => {
  switch(action.type) {
    case 'goods/SET':
      return action.payload;

    case 'goods/ADD':
      return action.payload;

    default:
      return goods;
  }
};

export const actions = { setGoods, addGoods }

export default goodsReducer;