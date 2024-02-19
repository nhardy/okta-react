/*
 * Copyright (c) 2017-Present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import * as React from 'react';
import { AuthSdkError } from '@okta/okta-auth-js';
import useLoginCallback, { LoginCallbackOptions } from '../hooks/useLoginCallback';
import useComponents, { ComponentsOptions } from '../hooks/useComponents';
import useOktaAuth from '../context/useOktaAuth';

export type LoginCallbackProps = React.PropsWithChildren<LoginCallbackOptions & ComponentsOptions>;

const LoginCallback: React.FC<LoginCallbackProps> = ({
  children,
  ...options
}) => {
  const oktaContext = useOktaAuth();
  const { isLoginRedirect, callbackError } = useLoginCallback(oktaContext, options);
  const { ErrorReporter, Loading } = useComponents(oktaContext, options);

  if (!isLoginRedirect) {
    if (children) {
      return (<>{children}</>);
    } else {
      // This can happen if <LoginCallback> is mounted to a wrong route
      //  or there are no requried query/hash parameters in the URL
      const error = new AuthSdkError('Can\'t handle login redirect');
      return <ErrorReporter error={error} />;
    }
  } else if (callbackError) {
    return <ErrorReporter error={callbackError} />;
  } else {
    return Loading;
  }
};

export default LoginCallback;
