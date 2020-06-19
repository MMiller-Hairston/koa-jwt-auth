import { Model, snakeCaseMappers } from 'objection';

export class User extends Model {
  id!: string;
  username!: string;
  email!: string;
  salted_password!: string;
  full_name!: string;
  profile_picture?: string;
  is_business!: boolean;
  bio?: string;
  website?: string;
  counts!: {
    posts: number;
    follows: number;
    followed_by: number;
    likes: number;
  };
  created_at!: string;
  updated_at?: string;

  $beforeInsert() {
    this.created_at = new Date().toISOString();
  }

  $beforeUpdate() {
    this.updated_at = new Date().toISOString();
  }

  static get tableName() {
    return 'users';
  }

  static get idColumn() {
    return 'id';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['email', 'salted_password', 'username', 'full_name'],
      properties: {
        id: { type: 'uuid' },
        username: { type: 'string', minLength: 3, maxLength: 24 },
        email: { type: 'string', minLength: 8, maxLength: 255 },
        salted_password: { type: 'string', minLength: 8, maxLength: 255 },
        full_name: { type: 'string', minLength: 5, maxLength: 36 },
        profile_picture: { type: 'string', minLength: 1, maxLength: 255 },
        is_business: { type: 'boolean' },
        bio: { type: 'string', minLength: 1, maxLength: 255 },
        website: { type: 'string', minLength: 1, maxLength: 255 },
        counts: {
          type: 'object',
          properties: {
            posts: { type: 'number' },
            follows: { type: 'number' },
            followed_by: { type: 'number' },
            likes: { type: 'number' }
          }
        }
      }
    };
  }
}
