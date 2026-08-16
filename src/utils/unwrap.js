/** Unwrap Spring GenericResponse `{ status, message, content, pageable? }`. */

export function unwrapEnvelope(payload) {
  if (payload == null || typeof payload !== 'object') return payload;
  if (!Object.prototype.hasOwnProperty.call(payload, 'content')) return payload;
  if (payload.pageable) {
    return {
      items: payload.content,
      pageable: payload.pageable,
      message: payload.message,
      status: payload.status
    };
  }
  return payload.content;
}

export function envelopeMessage(error) {
  const data = error?.response?.data;
  if (data && typeof data === 'object' && data.message) return data.message;
  return error?.message || 'Request failed';
}

export function isOtpEnvelope(payload, content) {
  const message = String(payload?.message || '');
  const empty = content == null
    || (Array.isArray(content) && content.length === 0)
    || (typeof content === 'object' && !content.token && Object.keys(content).length === 0);
  return empty && /otp/i.test(message);
}

export function apiOrigin() {
  const base = process.env.VUE_APP_API_BASE_URL || 'http://localhost:8088/api/v1';
  return base.replace(/\/api\/v1\/?$/, '').replace(/\/$/, '');
}

export function resolveMediaUrl(url) {
  if (!url) return '';
  if (/^(https?:|data:|blob:)/i.test(url)) return url;
  const origin = apiOrigin();
  return `${origin}${url.startsWith('/') ? url : `/${url}`}`;
}

export function asList(data) {
  if (data == null) return [];
  if (Array.isArray(data)) return data;
  if (Array.isArray(data.items)) return data.items;
  if (Array.isArray(data.content)) return data.content;
  return data;
}

/** Map unwrapped UserInfoDto to the auth store shape. */
export function mapUserInfo(content) {
  if (!content || typeof content !== 'object') return content;
  const names = String(content.fullName || '').trim().split(/\s+/).filter(Boolean);
  const avatar = content.avatarUrl ? resolveMediaUrl(content.avatarUrl) : content.avatarUrl;
  return {
    token: content.token,
    accessToken: content.token,
    refreshToken: content.refreshToken,
    username: content.username,
    permissions: content.permissions || [],
    fullName: content.fullName,
    avatarUrl: avatar,
    role: content.role,
    user: {
      uuid: content.uuid,
      id: content.uuid,
      username: content.username,
      email: content.username,
      fullName: content.fullName,
      firstName: names[0] || '',
      lastName: names.slice(1).join(' ') || '',
      avatar,
      avatarUrl: avatar,
      role: content.role,
      permissions: content.permissions || []
    }
  };
}
