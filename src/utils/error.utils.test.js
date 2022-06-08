const { GraphQLError } = require('graphql');
const { VERSION } = require('../config');

const {
  internal,
  notFound,
  insufficientScope,
  formatErrorForGraphQL,
} = require('./error.utils');

describe('Error Utils Test', () => {
  describe('internal', () => {
    test('should return an operation outcome', () => {
      const error = internal(VERSION['3_0_1']);

      expect(error.resourceType).toEqual('OperationOutcome');
    });

    test('should return an operation outcome with issue code of not-found', () => {
      const error = internal(VERSION['3_0_1']);
      const [issue] = error.issue;

      expect(issue.code).toEqual('exception');
      expect(issue.severity).toEqual('error');
    });

    test('should return an operation outcome with the provided diagnostics', () => {
      const error = internal(VERSION['3_0_1'], 'Some Message');
      const [issue] = error.issue;

      expect(issue.diagnostics).toEqual('Some Message');
    });
  });

  describe('notFound', () => {
    test('should return an operation outcome', () => {
      const error = notFound(VERSION['3_0_1']);

      expect(error.resourceType).toEqual('OperationOutcome');
    });

    test('should return an operation outcome with issue code of not-found', () => {
      const error = notFound(VERSION['3_0_1']);
      const [issue] = error.issue;

      expect(issue.code).toEqual('not-found');
      expect(issue.severity).toEqual('error');
    });

    test('should return an operation outcome with the provided diagnostics', () => {
      const error = notFound(VERSION['3_0_1'], 'Some Message');
      const [issue] = error.issue;

      expect(issue.diagnostics).toEqual('Some Message');
    });
  });

  describe('insufficientScope', () => {
    test('should return an operation outcome', () => {
      const error = insufficientScope(VERSION['3_0_1']);

      expect(error.resourceType).toEqual('OperationOutcome');
    });

    test('should return an operation outcome with issue code of forbidden', () => {
      const error = insufficientScope(VERSION['3_0_1']);
      const [issue] = error.issue;

      expect(issue.code).toEqual('forbidden');
      expect(issue.severity).toEqual('error');
    });

    test('should return an operation outcome with the provided diagnostics', () => {
      const error = insufficientScope(VERSION['3_0_1'], 'Some Message');
      const [issue] = error.issue;

      expect(issue.diagnostics).toEqual('Some Message');
    });
  });

  describe('formatErrorForGraphQL', () => {
    test('should return a valid GraphQL error', () => {
      const operationOutcome = { issue: [{ diagnostics: 'FUBAR' }] };
      const error = formatErrorForGraphQL(operationOutcome);

      expect(error instanceof GraphQLError).toBeTruthy();
    });

    test('should return any provided JSON embedded in the extensions property', () => {
      const operationOutcome = { issue: [{ diagnostics: 'FUBAR' }] };
      const error = formatErrorForGraphQL(operationOutcome);

      expect(error.extensions.resource).toBeDefined();
      expect(error.extensions.resource).toEqual(operationOutcome);
    });
  });
});
