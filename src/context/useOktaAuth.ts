/*
 * Copyright (c) 2020-Present, Okta, Inc. and/or its affiliates. All rights reserved.
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
import OktaContext from '.';
import { IOktaContext } from '../types';

const useOktaAuth = (context?: typeof OktaContext): IOktaContext => {
  const currentContext = React.useContext(context ?? OktaContext);
  if (!currentContext) {
    throw new Error(`
      Okta context is not provided!
      Please wrap your components with <Security> which acts as the context provider.
    `);
  }
  return currentContext;
}

export default useOktaAuth;
