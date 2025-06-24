import { PreTokenGenerationAuthenticationV2TriggerEvent } from 'aws-lambda';

export async function handler(
  event: PreTokenGenerationAuthenticationV2TriggerEvent,
) {
  event.response = {
    claimsAndScopeOverrideDetails: {
      accessTokenGeneration: {
        claimsToAddOrOverride: {
          internalId: event.request.userAttributes['custom:internalId'],
        },
      },
    },
  };
  return event;
}
