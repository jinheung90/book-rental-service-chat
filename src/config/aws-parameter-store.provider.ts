import { EnvironmentName } from './environment-name';
import {
  GetParametersByPathCommand,
  SSMClient,
  SSMClientConfig,
} from '@aws-sdk/client-ssm';
import * as process from 'process';

export const AwsParameterStoreProvider = async () => {
  let clientConfig: SSMClientConfig;
  const basePath = process.env['AWS_CONFIG_BASE_PATH'];
  if (process.env['APP_ENV'] === EnvironmentName.LOCAL) {
    clientConfig = {
      region: process.env['AWS_REGION'],
      credentials: {
        accessKeyId: process.env['AWS_ACCESS_KEY_ID'],
        secretAccessKey: process.env['AWS_SECRET_KEY'],
      },
    };
  } else {
    clientConfig = {
      region: process.env['AWS_REGION'],
    };
  }

  const command = new GetParametersByPathCommand({
    Path: basePath,
    Recursive: true,
  });
  const parameters = await new SSMClient(clientConfig)
    .send(command)
    .then((r) => {
      return r.Parameters;
    });
  parameters.forEach((v) => {
    const parameterName = v.Name.replace(basePath, '');
    process.env[parameterName] = v.Value;
  });
};
