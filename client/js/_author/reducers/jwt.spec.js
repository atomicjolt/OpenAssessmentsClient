import { Constants as JwtConstants } from '../actions/jwt';
import jwt                           from './jwt';

describe('jwt reducer', () => {
  describe('initial state', () => {
    it('has a jwt token', () => {
      const initialState  = { jwt: 'asdf' };
      const state = jwt(initialState, {});
      expect(state.jwt).toEqual(initialState.jwt);
    });
  });

  describe('jwt update', () => {
    it('has a jwt token', () => {
      const state = jwt({ jwt: 'asdf' }, {});

      const newJwt = { jwt: '1234' };
      const newState = jwt(state, {
        type    : JwtConstants.REFRESH_JWT_DONE,
        payload : newJwt,
      });

      expect(newState).toEqual(newJwt.jwt);
    });
  });
});
