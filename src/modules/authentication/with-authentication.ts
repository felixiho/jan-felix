import { HttpError } from '@/utils/errors';
import { getTokenCookie } from './cookies';
import { RequestResponseObject } from './types';
import { getSession } from './session';

const withAuthentication = async <
  CustomRequestResponseObject extends RequestResponseObject,
>(
  requestResponseObject: CustomRequestResponseObject,
): Promise<
  | ({
      userSession: any;
    } & CustomRequestResponseObject)
  | CustomRequestResponseObject
> => {
  try {
    if (requestResponseObject.response.headersSent) {
      return requestResponseObject;
    }

    const userSession = await getSession(requestResponseObject.request);

    if (userSession) {
      return { ...requestResponseObject, userSession };
    }

    throw new HttpError(401, 'You are not authenticated.');
  } catch (error) {
    throw new HttpError(401, 'You are not authenticated.');
  }
};

export default withAuthentication;
