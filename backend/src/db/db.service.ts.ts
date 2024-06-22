import { Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectConnection } from 'nest-knexjs';
import {
  OperatorStatement,
  QueryStatementBuilder,
  WhereStatement,
} from './query.statment';

@Injectable()
export class DbService {
  constructor(@InjectConnection() private readonly knex: Knex) {}

  query = async (queryStatementBuilder: QueryStatementBuilder) => {
    return await this.knex.fromRaw(this.buildQuery(queryStatementBuilder));
  };

  private buildQuery(queryStatementBuilder: QueryStatementBuilder) {
    const where = this.buildWhere(queryStatementBuilder.where);
    const colomns = this.buildColumns(queryStatementBuilder.columns);
    const table = queryStatementBuilder.table;
    const query = `(SELECT ${colomns} FROM ${table} ${where})`;
    return query;
  }

  private buildWhere<T>(whereStatement: WhereStatement<T>[]) {
    if (whereStatement.length === 0) {
      return '';
    } else {
      return `WHERE ${whereStatement
        .map(
          (where) =>
            `${where.column} ${where.operator} ${this.isArrayOperator(where.operator) ? this.buildValueArray(where.value as T[]) : this.buildValue(where.value)}`,
        )
        .join(' AND ')}`;
    }
  }

  private buildValueArray<T>(whareValue: T[]) {
    return `(${whareValue.map((value) => this.buildValue(value)).join(', ')})`;
  }

  private buildValue = <T>(whareValue: T) =>
    typeof whareValue === 'string' ? `'${whareValue}'` : whareValue;

  private buildColumns(columns: string[]) {
    if (columns.length === 0) {
      return '*';
    } else {
      return columns.join(', ');
    }
  }

  private isArrayOperator = (operator: OperatorStatement) =>
    operator === OperatorStatement.IN ||
    operator === OperatorStatement['NOT IN'];
}
