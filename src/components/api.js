const groupId = 'pwff-cohort-1';
const authorizationToken = '564e2fe5-3911-4b19-9931-ddcd645648a8';

const requestConfig = {
  baseUrl: `https://nomoreparties.co/v1/${groupId}`,
  headers: { authorization: authorizationToken },
};

// User

export function getUser() {
  return sendApiRequest('users/me');
}

export function patchUser(user) {
  return sendApiRequest('users/me', 'PATCH', user);
}

export function changeUserAvatar(avatar) {
  return sendApiRequest('users/me/avatar', 'PATCH', avatar);
}

// Cards

export function getInitialCards() {
  return sendApiRequest('cards');
}

export function saveCard(card) {
  return sendApiRequest('cards', 'POST', card);
}

export function deleteCard(id) {
  return sendApiRequest(`cards/${id}`, 'DELETE');
}

// Likes

export function saveCardLike(id) {
  return sendApiRequest(`cards/likes/${id}`, 'PUT');
}

export function deleteCardLike(id) {
  return sendApiRequest(`cards/likes/${id}`, 'DELETE');
}

// Image Verification

export async function validateImageLink(link) {
  try {
    const res = await fetch(link, { method: 'HEAD' });
    if (res.ok) {
      return res.headers.get('Content-Type').includes('image');
    }
  } catch (err) {
    console.error(`${err.message}. Ссылка ${link} недействительна`);
  }

  return false;
}

async function sendApiRequest(path, method = 'GET', body) {
  const options = { method, headers: requestConfig.headers };
  if (body) {
    options.headers['Content-Type'] = 'application/json';
    options.body = JSON.stringify(body);
  }

  const res = await fetch(`${requestConfig.baseUrl}/${path}`, options);
  if (res.ok) {
    return res.json();
  }

  throw new Error(`Статус ответа ${res.status}`);
}
