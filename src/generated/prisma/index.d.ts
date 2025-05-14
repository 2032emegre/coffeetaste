
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model TastingRecord
 * 
 */
export type TastingRecord = $Result.DefaultSelection<Prisma.$TastingRecordPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more TastingRecords
 * const tastingRecords = await prisma.tastingRecord.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more TastingRecords
   * const tastingRecords = await prisma.tastingRecord.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.tastingRecord`: Exposes CRUD operations for the **TastingRecord** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TastingRecords
    * const tastingRecords = await prisma.tastingRecord.findMany()
    * ```
    */
  get tastingRecord(): Prisma.TastingRecordDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.7.0
   * Query Engine version: 3cff47a7f5d65c3ea74883f1d736e41d68ce91ed
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    TastingRecord: 'TastingRecord'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "tastingRecord"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      TastingRecord: {
        payload: Prisma.$TastingRecordPayload<ExtArgs>
        fields: Prisma.TastingRecordFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TastingRecordFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TastingRecordPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TastingRecordFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TastingRecordPayload>
          }
          findFirst: {
            args: Prisma.TastingRecordFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TastingRecordPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TastingRecordFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TastingRecordPayload>
          }
          findMany: {
            args: Prisma.TastingRecordFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TastingRecordPayload>[]
          }
          create: {
            args: Prisma.TastingRecordCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TastingRecordPayload>
          }
          createMany: {
            args: Prisma.TastingRecordCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TastingRecordCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TastingRecordPayload>[]
          }
          delete: {
            args: Prisma.TastingRecordDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TastingRecordPayload>
          }
          update: {
            args: Prisma.TastingRecordUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TastingRecordPayload>
          }
          deleteMany: {
            args: Prisma.TastingRecordDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TastingRecordUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TastingRecordUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TastingRecordPayload>[]
          }
          upsert: {
            args: Prisma.TastingRecordUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TastingRecordPayload>
          }
          aggregate: {
            args: Prisma.TastingRecordAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTastingRecord>
          }
          groupBy: {
            args: Prisma.TastingRecordGroupByArgs<ExtArgs>
            result: $Utils.Optional<TastingRecordGroupByOutputType>[]
          }
          count: {
            args: Prisma.TastingRecordCountArgs<ExtArgs>
            result: $Utils.Optional<TastingRecordCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    tastingRecord?: TastingRecordOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */



  /**
   * Models
   */

  /**
   * Model TastingRecord
   */

  export type AggregateTastingRecord = {
    _count: TastingRecordCountAggregateOutputType | null
    _avg: TastingRecordAvgAggregateOutputType | null
    _sum: TastingRecordSumAggregateOutputType | null
    _min: TastingRecordMinAggregateOutputType | null
    _max: TastingRecordMaxAggregateOutputType | null
  }

  export type TastingRecordAvgAggregateOutputType = {
    id: number | null
    score: number | null
  }

  export type TastingRecordSumAggregateOutputType = {
    id: number | null
    score: number | null
  }

  export type TastingRecordMinAggregateOutputType = {
    id: number | null
    coffeeName: string | null
    score: number | null
    notes: string | null
    createdAt: Date | null
  }

  export type TastingRecordMaxAggregateOutputType = {
    id: number | null
    coffeeName: string | null
    score: number | null
    notes: string | null
    createdAt: Date | null
  }

  export type TastingRecordCountAggregateOutputType = {
    id: number
    coffeeName: number
    score: number
    notes: number
    createdAt: number
    _all: number
  }


  export type TastingRecordAvgAggregateInputType = {
    id?: true
    score?: true
  }

  export type TastingRecordSumAggregateInputType = {
    id?: true
    score?: true
  }

  export type TastingRecordMinAggregateInputType = {
    id?: true
    coffeeName?: true
    score?: true
    notes?: true
    createdAt?: true
  }

  export type TastingRecordMaxAggregateInputType = {
    id?: true
    coffeeName?: true
    score?: true
    notes?: true
    createdAt?: true
  }

  export type TastingRecordCountAggregateInputType = {
    id?: true
    coffeeName?: true
    score?: true
    notes?: true
    createdAt?: true
    _all?: true
  }

  export type TastingRecordAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TastingRecord to aggregate.
     */
    where?: TastingRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TastingRecords to fetch.
     */
    orderBy?: TastingRecordOrderByWithRelationInput | TastingRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TastingRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TastingRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TastingRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TastingRecords
    **/
    _count?: true | TastingRecordCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TastingRecordAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TastingRecordSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TastingRecordMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TastingRecordMaxAggregateInputType
  }

  export type GetTastingRecordAggregateType<T extends TastingRecordAggregateArgs> = {
        [P in keyof T & keyof AggregateTastingRecord]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTastingRecord[P]>
      : GetScalarType<T[P], AggregateTastingRecord[P]>
  }




  export type TastingRecordGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TastingRecordWhereInput
    orderBy?: TastingRecordOrderByWithAggregationInput | TastingRecordOrderByWithAggregationInput[]
    by: TastingRecordScalarFieldEnum[] | TastingRecordScalarFieldEnum
    having?: TastingRecordScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TastingRecordCountAggregateInputType | true
    _avg?: TastingRecordAvgAggregateInputType
    _sum?: TastingRecordSumAggregateInputType
    _min?: TastingRecordMinAggregateInputType
    _max?: TastingRecordMaxAggregateInputType
  }

  export type TastingRecordGroupByOutputType = {
    id: number
    coffeeName: string
    score: number
    notes: string | null
    createdAt: Date
    _count: TastingRecordCountAggregateOutputType | null
    _avg: TastingRecordAvgAggregateOutputType | null
    _sum: TastingRecordSumAggregateOutputType | null
    _min: TastingRecordMinAggregateOutputType | null
    _max: TastingRecordMaxAggregateOutputType | null
  }

  type GetTastingRecordGroupByPayload<T extends TastingRecordGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TastingRecordGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TastingRecordGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TastingRecordGroupByOutputType[P]>
            : GetScalarType<T[P], TastingRecordGroupByOutputType[P]>
        }
      >
    >


  export type TastingRecordSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    coffeeName?: boolean
    score?: boolean
    notes?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["tastingRecord"]>

  export type TastingRecordSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    coffeeName?: boolean
    score?: boolean
    notes?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["tastingRecord"]>

  export type TastingRecordSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    coffeeName?: boolean
    score?: boolean
    notes?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["tastingRecord"]>

  export type TastingRecordSelectScalar = {
    id?: boolean
    coffeeName?: boolean
    score?: boolean
    notes?: boolean
    createdAt?: boolean
  }

  export type TastingRecordOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "coffeeName" | "score" | "notes" | "createdAt", ExtArgs["result"]["tastingRecord"]>

  export type $TastingRecordPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TastingRecord"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      coffeeName: string
      score: number
      notes: string | null
      createdAt: Date
    }, ExtArgs["result"]["tastingRecord"]>
    composites: {}
  }

  type TastingRecordGetPayload<S extends boolean | null | undefined | TastingRecordDefaultArgs> = $Result.GetResult<Prisma.$TastingRecordPayload, S>

  type TastingRecordCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TastingRecordFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TastingRecordCountAggregateInputType | true
    }

  export interface TastingRecordDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TastingRecord'], meta: { name: 'TastingRecord' } }
    /**
     * Find zero or one TastingRecord that matches the filter.
     * @param {TastingRecordFindUniqueArgs} args - Arguments to find a TastingRecord
     * @example
     * // Get one TastingRecord
     * const tastingRecord = await prisma.tastingRecord.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TastingRecordFindUniqueArgs>(args: SelectSubset<T, TastingRecordFindUniqueArgs<ExtArgs>>): Prisma__TastingRecordClient<$Result.GetResult<Prisma.$TastingRecordPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TastingRecord that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TastingRecordFindUniqueOrThrowArgs} args - Arguments to find a TastingRecord
     * @example
     * // Get one TastingRecord
     * const tastingRecord = await prisma.tastingRecord.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TastingRecordFindUniqueOrThrowArgs>(args: SelectSubset<T, TastingRecordFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TastingRecordClient<$Result.GetResult<Prisma.$TastingRecordPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TastingRecord that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TastingRecordFindFirstArgs} args - Arguments to find a TastingRecord
     * @example
     * // Get one TastingRecord
     * const tastingRecord = await prisma.tastingRecord.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TastingRecordFindFirstArgs>(args?: SelectSubset<T, TastingRecordFindFirstArgs<ExtArgs>>): Prisma__TastingRecordClient<$Result.GetResult<Prisma.$TastingRecordPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TastingRecord that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TastingRecordFindFirstOrThrowArgs} args - Arguments to find a TastingRecord
     * @example
     * // Get one TastingRecord
     * const tastingRecord = await prisma.tastingRecord.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TastingRecordFindFirstOrThrowArgs>(args?: SelectSubset<T, TastingRecordFindFirstOrThrowArgs<ExtArgs>>): Prisma__TastingRecordClient<$Result.GetResult<Prisma.$TastingRecordPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TastingRecords that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TastingRecordFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TastingRecords
     * const tastingRecords = await prisma.tastingRecord.findMany()
     * 
     * // Get first 10 TastingRecords
     * const tastingRecords = await prisma.tastingRecord.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tastingRecordWithIdOnly = await prisma.tastingRecord.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TastingRecordFindManyArgs>(args?: SelectSubset<T, TastingRecordFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TastingRecordPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TastingRecord.
     * @param {TastingRecordCreateArgs} args - Arguments to create a TastingRecord.
     * @example
     * // Create one TastingRecord
     * const TastingRecord = await prisma.tastingRecord.create({
     *   data: {
     *     // ... data to create a TastingRecord
     *   }
     * })
     * 
     */
    create<T extends TastingRecordCreateArgs>(args: SelectSubset<T, TastingRecordCreateArgs<ExtArgs>>): Prisma__TastingRecordClient<$Result.GetResult<Prisma.$TastingRecordPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TastingRecords.
     * @param {TastingRecordCreateManyArgs} args - Arguments to create many TastingRecords.
     * @example
     * // Create many TastingRecords
     * const tastingRecord = await prisma.tastingRecord.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TastingRecordCreateManyArgs>(args?: SelectSubset<T, TastingRecordCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TastingRecords and returns the data saved in the database.
     * @param {TastingRecordCreateManyAndReturnArgs} args - Arguments to create many TastingRecords.
     * @example
     * // Create many TastingRecords
     * const tastingRecord = await prisma.tastingRecord.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TastingRecords and only return the `id`
     * const tastingRecordWithIdOnly = await prisma.tastingRecord.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TastingRecordCreateManyAndReturnArgs>(args?: SelectSubset<T, TastingRecordCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TastingRecordPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a TastingRecord.
     * @param {TastingRecordDeleteArgs} args - Arguments to delete one TastingRecord.
     * @example
     * // Delete one TastingRecord
     * const TastingRecord = await prisma.tastingRecord.delete({
     *   where: {
     *     // ... filter to delete one TastingRecord
     *   }
     * })
     * 
     */
    delete<T extends TastingRecordDeleteArgs>(args: SelectSubset<T, TastingRecordDeleteArgs<ExtArgs>>): Prisma__TastingRecordClient<$Result.GetResult<Prisma.$TastingRecordPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TastingRecord.
     * @param {TastingRecordUpdateArgs} args - Arguments to update one TastingRecord.
     * @example
     * // Update one TastingRecord
     * const tastingRecord = await prisma.tastingRecord.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TastingRecordUpdateArgs>(args: SelectSubset<T, TastingRecordUpdateArgs<ExtArgs>>): Prisma__TastingRecordClient<$Result.GetResult<Prisma.$TastingRecordPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TastingRecords.
     * @param {TastingRecordDeleteManyArgs} args - Arguments to filter TastingRecords to delete.
     * @example
     * // Delete a few TastingRecords
     * const { count } = await prisma.tastingRecord.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TastingRecordDeleteManyArgs>(args?: SelectSubset<T, TastingRecordDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TastingRecords.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TastingRecordUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TastingRecords
     * const tastingRecord = await prisma.tastingRecord.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TastingRecordUpdateManyArgs>(args: SelectSubset<T, TastingRecordUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TastingRecords and returns the data updated in the database.
     * @param {TastingRecordUpdateManyAndReturnArgs} args - Arguments to update many TastingRecords.
     * @example
     * // Update many TastingRecords
     * const tastingRecord = await prisma.tastingRecord.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more TastingRecords and only return the `id`
     * const tastingRecordWithIdOnly = await prisma.tastingRecord.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TastingRecordUpdateManyAndReturnArgs>(args: SelectSubset<T, TastingRecordUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TastingRecordPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one TastingRecord.
     * @param {TastingRecordUpsertArgs} args - Arguments to update or create a TastingRecord.
     * @example
     * // Update or create a TastingRecord
     * const tastingRecord = await prisma.tastingRecord.upsert({
     *   create: {
     *     // ... data to create a TastingRecord
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TastingRecord we want to update
     *   }
     * })
     */
    upsert<T extends TastingRecordUpsertArgs>(args: SelectSubset<T, TastingRecordUpsertArgs<ExtArgs>>): Prisma__TastingRecordClient<$Result.GetResult<Prisma.$TastingRecordPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TastingRecords.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TastingRecordCountArgs} args - Arguments to filter TastingRecords to count.
     * @example
     * // Count the number of TastingRecords
     * const count = await prisma.tastingRecord.count({
     *   where: {
     *     // ... the filter for the TastingRecords we want to count
     *   }
     * })
    **/
    count<T extends TastingRecordCountArgs>(
      args?: Subset<T, TastingRecordCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TastingRecordCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TastingRecord.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TastingRecordAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TastingRecordAggregateArgs>(args: Subset<T, TastingRecordAggregateArgs>): Prisma.PrismaPromise<GetTastingRecordAggregateType<T>>

    /**
     * Group by TastingRecord.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TastingRecordGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TastingRecordGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TastingRecordGroupByArgs['orderBy'] }
        : { orderBy?: TastingRecordGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TastingRecordGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTastingRecordGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TastingRecord model
   */
  readonly fields: TastingRecordFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TastingRecord.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TastingRecordClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TastingRecord model
   */
  interface TastingRecordFieldRefs {
    readonly id: FieldRef<"TastingRecord", 'Int'>
    readonly coffeeName: FieldRef<"TastingRecord", 'String'>
    readonly score: FieldRef<"TastingRecord", 'Int'>
    readonly notes: FieldRef<"TastingRecord", 'String'>
    readonly createdAt: FieldRef<"TastingRecord", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * TastingRecord findUnique
   */
  export type TastingRecordFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TastingRecord
     */
    select?: TastingRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TastingRecord
     */
    omit?: TastingRecordOmit<ExtArgs> | null
    /**
     * Filter, which TastingRecord to fetch.
     */
    where: TastingRecordWhereUniqueInput
  }

  /**
   * TastingRecord findUniqueOrThrow
   */
  export type TastingRecordFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TastingRecord
     */
    select?: TastingRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TastingRecord
     */
    omit?: TastingRecordOmit<ExtArgs> | null
    /**
     * Filter, which TastingRecord to fetch.
     */
    where: TastingRecordWhereUniqueInput
  }

  /**
   * TastingRecord findFirst
   */
  export type TastingRecordFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TastingRecord
     */
    select?: TastingRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TastingRecord
     */
    omit?: TastingRecordOmit<ExtArgs> | null
    /**
     * Filter, which TastingRecord to fetch.
     */
    where?: TastingRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TastingRecords to fetch.
     */
    orderBy?: TastingRecordOrderByWithRelationInput | TastingRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TastingRecords.
     */
    cursor?: TastingRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TastingRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TastingRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TastingRecords.
     */
    distinct?: TastingRecordScalarFieldEnum | TastingRecordScalarFieldEnum[]
  }

  /**
   * TastingRecord findFirstOrThrow
   */
  export type TastingRecordFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TastingRecord
     */
    select?: TastingRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TastingRecord
     */
    omit?: TastingRecordOmit<ExtArgs> | null
    /**
     * Filter, which TastingRecord to fetch.
     */
    where?: TastingRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TastingRecords to fetch.
     */
    orderBy?: TastingRecordOrderByWithRelationInput | TastingRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TastingRecords.
     */
    cursor?: TastingRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TastingRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TastingRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TastingRecords.
     */
    distinct?: TastingRecordScalarFieldEnum | TastingRecordScalarFieldEnum[]
  }

  /**
   * TastingRecord findMany
   */
  export type TastingRecordFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TastingRecord
     */
    select?: TastingRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TastingRecord
     */
    omit?: TastingRecordOmit<ExtArgs> | null
    /**
     * Filter, which TastingRecords to fetch.
     */
    where?: TastingRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TastingRecords to fetch.
     */
    orderBy?: TastingRecordOrderByWithRelationInput | TastingRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TastingRecords.
     */
    cursor?: TastingRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TastingRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TastingRecords.
     */
    skip?: number
    distinct?: TastingRecordScalarFieldEnum | TastingRecordScalarFieldEnum[]
  }

  /**
   * TastingRecord create
   */
  export type TastingRecordCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TastingRecord
     */
    select?: TastingRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TastingRecord
     */
    omit?: TastingRecordOmit<ExtArgs> | null
    /**
     * The data needed to create a TastingRecord.
     */
    data: XOR<TastingRecordCreateInput, TastingRecordUncheckedCreateInput>
  }

  /**
   * TastingRecord createMany
   */
  export type TastingRecordCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TastingRecords.
     */
    data: TastingRecordCreateManyInput | TastingRecordCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TastingRecord createManyAndReturn
   */
  export type TastingRecordCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TastingRecord
     */
    select?: TastingRecordSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TastingRecord
     */
    omit?: TastingRecordOmit<ExtArgs> | null
    /**
     * The data used to create many TastingRecords.
     */
    data: TastingRecordCreateManyInput | TastingRecordCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TastingRecord update
   */
  export type TastingRecordUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TastingRecord
     */
    select?: TastingRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TastingRecord
     */
    omit?: TastingRecordOmit<ExtArgs> | null
    /**
     * The data needed to update a TastingRecord.
     */
    data: XOR<TastingRecordUpdateInput, TastingRecordUncheckedUpdateInput>
    /**
     * Choose, which TastingRecord to update.
     */
    where: TastingRecordWhereUniqueInput
  }

  /**
   * TastingRecord updateMany
   */
  export type TastingRecordUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TastingRecords.
     */
    data: XOR<TastingRecordUpdateManyMutationInput, TastingRecordUncheckedUpdateManyInput>
    /**
     * Filter which TastingRecords to update
     */
    where?: TastingRecordWhereInput
    /**
     * Limit how many TastingRecords to update.
     */
    limit?: number
  }

  /**
   * TastingRecord updateManyAndReturn
   */
  export type TastingRecordUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TastingRecord
     */
    select?: TastingRecordSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TastingRecord
     */
    omit?: TastingRecordOmit<ExtArgs> | null
    /**
     * The data used to update TastingRecords.
     */
    data: XOR<TastingRecordUpdateManyMutationInput, TastingRecordUncheckedUpdateManyInput>
    /**
     * Filter which TastingRecords to update
     */
    where?: TastingRecordWhereInput
    /**
     * Limit how many TastingRecords to update.
     */
    limit?: number
  }

  /**
   * TastingRecord upsert
   */
  export type TastingRecordUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TastingRecord
     */
    select?: TastingRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TastingRecord
     */
    omit?: TastingRecordOmit<ExtArgs> | null
    /**
     * The filter to search for the TastingRecord to update in case it exists.
     */
    where: TastingRecordWhereUniqueInput
    /**
     * In case the TastingRecord found by the `where` argument doesn't exist, create a new TastingRecord with this data.
     */
    create: XOR<TastingRecordCreateInput, TastingRecordUncheckedCreateInput>
    /**
     * In case the TastingRecord was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TastingRecordUpdateInput, TastingRecordUncheckedUpdateInput>
  }

  /**
   * TastingRecord delete
   */
  export type TastingRecordDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TastingRecord
     */
    select?: TastingRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TastingRecord
     */
    omit?: TastingRecordOmit<ExtArgs> | null
    /**
     * Filter which TastingRecord to delete.
     */
    where: TastingRecordWhereUniqueInput
  }

  /**
   * TastingRecord deleteMany
   */
  export type TastingRecordDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TastingRecords to delete
     */
    where?: TastingRecordWhereInput
    /**
     * Limit how many TastingRecords to delete.
     */
    limit?: number
  }

  /**
   * TastingRecord without action
   */
  export type TastingRecordDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TastingRecord
     */
    select?: TastingRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TastingRecord
     */
    omit?: TastingRecordOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const TastingRecordScalarFieldEnum: {
    id: 'id',
    coffeeName: 'coffeeName',
    score: 'score',
    notes: 'notes',
    createdAt: 'createdAt'
  };

  export type TastingRecordScalarFieldEnum = (typeof TastingRecordScalarFieldEnum)[keyof typeof TastingRecordScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type TastingRecordWhereInput = {
    AND?: TastingRecordWhereInput | TastingRecordWhereInput[]
    OR?: TastingRecordWhereInput[]
    NOT?: TastingRecordWhereInput | TastingRecordWhereInput[]
    id?: IntFilter<"TastingRecord"> | number
    coffeeName?: StringFilter<"TastingRecord"> | string
    score?: IntFilter<"TastingRecord"> | number
    notes?: StringNullableFilter<"TastingRecord"> | string | null
    createdAt?: DateTimeFilter<"TastingRecord"> | Date | string
  }

  export type TastingRecordOrderByWithRelationInput = {
    id?: SortOrder
    coffeeName?: SortOrder
    score?: SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
  }

  export type TastingRecordWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: TastingRecordWhereInput | TastingRecordWhereInput[]
    OR?: TastingRecordWhereInput[]
    NOT?: TastingRecordWhereInput | TastingRecordWhereInput[]
    coffeeName?: StringFilter<"TastingRecord"> | string
    score?: IntFilter<"TastingRecord"> | number
    notes?: StringNullableFilter<"TastingRecord"> | string | null
    createdAt?: DateTimeFilter<"TastingRecord"> | Date | string
  }, "id">

  export type TastingRecordOrderByWithAggregationInput = {
    id?: SortOrder
    coffeeName?: SortOrder
    score?: SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: TastingRecordCountOrderByAggregateInput
    _avg?: TastingRecordAvgOrderByAggregateInput
    _max?: TastingRecordMaxOrderByAggregateInput
    _min?: TastingRecordMinOrderByAggregateInput
    _sum?: TastingRecordSumOrderByAggregateInput
  }

  export type TastingRecordScalarWhereWithAggregatesInput = {
    AND?: TastingRecordScalarWhereWithAggregatesInput | TastingRecordScalarWhereWithAggregatesInput[]
    OR?: TastingRecordScalarWhereWithAggregatesInput[]
    NOT?: TastingRecordScalarWhereWithAggregatesInput | TastingRecordScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"TastingRecord"> | number
    coffeeName?: StringWithAggregatesFilter<"TastingRecord"> | string
    score?: IntWithAggregatesFilter<"TastingRecord"> | number
    notes?: StringNullableWithAggregatesFilter<"TastingRecord"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"TastingRecord"> | Date | string
  }

  export type TastingRecordCreateInput = {
    coffeeName: string
    score: number
    notes?: string | null
    createdAt?: Date | string
  }

  export type TastingRecordUncheckedCreateInput = {
    id?: number
    coffeeName: string
    score: number
    notes?: string | null
    createdAt?: Date | string
  }

  export type TastingRecordUpdateInput = {
    coffeeName?: StringFieldUpdateOperationsInput | string
    score?: IntFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TastingRecordUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    coffeeName?: StringFieldUpdateOperationsInput | string
    score?: IntFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TastingRecordCreateManyInput = {
    id?: number
    coffeeName: string
    score: number
    notes?: string | null
    createdAt?: Date | string
  }

  export type TastingRecordUpdateManyMutationInput = {
    coffeeName?: StringFieldUpdateOperationsInput | string
    score?: IntFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TastingRecordUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    coffeeName?: StringFieldUpdateOperationsInput | string
    score?: IntFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type TastingRecordCountOrderByAggregateInput = {
    id?: SortOrder
    coffeeName?: SortOrder
    score?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
  }

  export type TastingRecordAvgOrderByAggregateInput = {
    id?: SortOrder
    score?: SortOrder
  }

  export type TastingRecordMaxOrderByAggregateInput = {
    id?: SortOrder
    coffeeName?: SortOrder
    score?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
  }

  export type TastingRecordMinOrderByAggregateInput = {
    id?: SortOrder
    coffeeName?: SortOrder
    score?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
  }

  export type TastingRecordSumOrderByAggregateInput = {
    id?: SortOrder
    score?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}