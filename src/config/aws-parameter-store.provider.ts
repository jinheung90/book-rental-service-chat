import { EnvironmentName } from './environment-name';
import {
  GetParametersByPathCommand,
  SSMClient,
  SSMClientConfig,
} from '@aws-sdk/client-ssm';
import * as process from 'process';
import { Logger } from '@nestjs/common';
import { fromContainerMetadata } from '@aws-sdk/credential-providers';

export const AwsParameterStoreProvider = async () => {
  const logger = new Logger();
  let clientConfig;
  const basePath = process.env['AWS_CONFIG_BASE_PATH'];

  const command = new GetParametersByPathCommand({
    Path: basePath,
    Recursive: true,
  });
  if (process.env['APP_ENV'] === EnvironmentName.LOCAL) {
    clientConfig = {
      region: process.env['AWS_REGION'],
      credentials: {
        accessKeyId: process.env['AWS_ACCESS_KEY_ID'],
        secretAccessKey: process.env['AWS_SECRET_KEY'],
      },
    };
  } else {
    clientConfig = fromContainerMetadata({
      timeout: 1000,
      maxRetries: 0,
    });
  }
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
