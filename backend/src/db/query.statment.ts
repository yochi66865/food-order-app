export type QueryStatementBuilder = {
  table: string;
  columns: string[];
  where: WhereStatement[];
};

export type WhereStatement<T = string> = {
  column: string;
  operator: OperatorStatement;
  value: T;
};

export enum OperatorStatement {
  '=' = '=',
  '<>' = '<>',
  '<' = '<',
  '>' = '>',
  '<=' = '<=',
  '>=' = '>=',
  'IN' = 'IN',
  'NOT IN' = 'NOT IN',
  'LIKE' = 'LIKE',
  'NOT LIKE' = 'NOT LIKE',
  'IS NULL' = 'IS NULL',
  'IS NOT NULL' = 'IS NOT NULL',
}
