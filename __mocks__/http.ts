import { baseUrl } from '../../utils/constants';
import User from '../../models/user';
import { isUndefined } from 'util';

let curUser : User|null = null;
const registredUsers : User[] = [];

function prepareFetchbody(body : User) : User|null {
  if (!body || !body.username || !body.password) {
    return null;
  }

  body.score = 0;
  delete body.password;

  return body;
}

class Http {
  static BaseUrl : string = baseUrl;

  static refresh() {
    registredUsers.length = 0;
    curUser = null;
  }

  static Fetch(method : string, path : string, body : any = undefined): Promise<Response|null> {
    switch (`${method} ${path}`) {
      case 'POST /user/signup':
        body = prepareFetchbody(body);
        if (curUser) {
          return Promise.resolve(null);
        }
        registredUsers.push(body);
        curUser = body;
        return Promise.resolve(new Response(curUser));
      case 'GET /user':
        return Promise.resolve(new Response(curUser));
      case 'GET /leaderboard':
        return Promise.resolve().then( () => {
          return new Response(
            registredUsers.sort((a, b) => {
              if (isUndefined(a.score) || isUndefined(b.score)) {
                throw Error('score is undefined');
              }
              return a.score - b.score;
            })
          );
        });
      case 'POST /user/logout':
        if (curUser) {
          curUser = null;
          return Promise.resolve(true as any);
        }
        return Promise.resolve(false as any);
      case 'POST /user/signin':
        body = prepareFetchbody(body);
        if (curUser) {
          return Promise.resolve(null);
        }
        curUser = curUser || registredUsers.find(el => el.username === body.username &&
          el.password === body.password) || null;
        return Promise.resolve(new Response(curUser));
      default:
        return Promise.reject(Error(`Origin API method ${method} ${path} calling is not permitted!`));
    }
  };
}

export default Http;
