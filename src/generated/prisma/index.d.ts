
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
 * Model RoastRecord
 * 
 */
export type RoastRecord = $Result.DefaultSelection<Prisma.$RoastRecordPayload>
/**
 * Model TastingRecord
 * 
 */
export type TastingRecord = $Result.DefaultSelection<Prisma.$TastingRecordPayload>
/**
 * Model ShopVisit
 * 
 */
export type ShopVisit = $Result.DefaultSelection<Prisma.$ShopVisitPayload>
/**
 * Model EspressoRecord
 * 
 */
export type EspressoRecord = $Result.DefaultSelection<Prisma.$EspressoRecordPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more RoastRecords
 * const roastRecords = await prisma.roastRecord.findMany()
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
   * // Fetch zero or more RoastRecords
   * const roastRecords = await prisma.roastRecord.findMany()
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
   * `prisma.roastRecord`: Exposes CRUD operations for the **RoastRecord** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RoastRecords
    * const roastRecords = await prisma.roastRecord.findMany()
    * ```
    */
  get roastRecord(): Prisma.RoastRecordDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.tastingRecord`: Exposes CRUD operations for the **TastingRecord** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TastingRecords
    * const tastingRecords = await prisma.tastingRecord.findMany()
    * ```
    */
  get tastingRecord(): Prisma.TastingRecordDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.shopVisit`: Exposes CRUD operations for the **ShopVisit** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ShopVisits
    * const shopVisits = await prisma.shopVisit.findMany()
    * ```
    */
  get shopVisit(): Prisma.ShopVisitDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.espressoRecord`: Exposes CRUD operations for the **EspressoRecord** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more EspressoRecords
    * const espressoRecords = await prisma.espressoRecord.findMany()
    * ```
    */
  get espressoRecord(): Prisma.EspressoRecordDelegate<ExtArgs, ClientOptions>;
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
    RoastRecord: 'RoastRecord',
    TastingRecord: 'TastingRecord',
    ShopVisit: 'ShopVisit',
    EspressoRecord: 'EspressoRecord'
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
      modelProps: "roastRecord" | "tastingRecord" | "shopVisit" | "espressoRecord"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      RoastRecord: {
        payload: Prisma.$RoastRecordPayload<ExtArgs>
        fields: Prisma.RoastRecordFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RoastRecordFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoastRecordPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RoastRecordFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoastRecordPayload>
          }
          findFirst: {
            args: Prisma.RoastRecordFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoastRecordPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RoastRecordFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoastRecordPayload>
          }
          findMany: {
            args: Prisma.RoastRecordFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoastRecordPayload>[]
          }
          create: {
            args: Prisma.RoastRecordCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoastRecordPayload>
          }
          createMany: {
            args: Prisma.RoastRecordCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RoastRecordCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoastRecordPayload>[]
          }
          delete: {
            args: Prisma.RoastRecordDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoastRecordPayload>
          }
          update: {
            args: Prisma.RoastRecordUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoastRecordPayload>
          }
          deleteMany: {
            args: Prisma.RoastRecordDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RoastRecordUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RoastRecordUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoastRecordPayload>[]
          }
          upsert: {
            args: Prisma.RoastRecordUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoastRecordPayload>
          }
          aggregate: {
            args: Prisma.RoastRecordAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRoastRecord>
          }
          groupBy: {
            args: Prisma.RoastRecordGroupByArgs<ExtArgs>
            result: $Utils.Optional<RoastRecordGroupByOutputType>[]
          }
          count: {
            args: Prisma.RoastRecordCountArgs<ExtArgs>
            result: $Utils.Optional<RoastRecordCountAggregateOutputType> | number
          }
        }
      }
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
      ShopVisit: {
        payload: Prisma.$ShopVisitPayload<ExtArgs>
        fields: Prisma.ShopVisitFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ShopVisitFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShopVisitPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ShopVisitFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShopVisitPayload>
          }
          findFirst: {
            args: Prisma.ShopVisitFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShopVisitPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ShopVisitFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShopVisitPayload>
          }
          findMany: {
            args: Prisma.ShopVisitFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShopVisitPayload>[]
          }
          create: {
            args: Prisma.ShopVisitCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShopVisitPayload>
          }
          createMany: {
            args: Prisma.ShopVisitCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ShopVisitCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShopVisitPayload>[]
          }
          delete: {
            args: Prisma.ShopVisitDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShopVisitPayload>
          }
          update: {
            args: Prisma.ShopVisitUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShopVisitPayload>
          }
          deleteMany: {
            args: Prisma.ShopVisitDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ShopVisitUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ShopVisitUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShopVisitPayload>[]
          }
          upsert: {
            args: Prisma.ShopVisitUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShopVisitPayload>
          }
          aggregate: {
            args: Prisma.ShopVisitAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateShopVisit>
          }
          groupBy: {
            args: Prisma.ShopVisitGroupByArgs<ExtArgs>
            result: $Utils.Optional<ShopVisitGroupByOutputType>[]
          }
          count: {
            args: Prisma.ShopVisitCountArgs<ExtArgs>
            result: $Utils.Optional<ShopVisitCountAggregateOutputType> | number
          }
        }
      }
      EspressoRecord: {
        payload: Prisma.$EspressoRecordPayload<ExtArgs>
        fields: Prisma.EspressoRecordFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EspressoRecordFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EspressoRecordPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EspressoRecordFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EspressoRecordPayload>
          }
          findFirst: {
            args: Prisma.EspressoRecordFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EspressoRecordPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EspressoRecordFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EspressoRecordPayload>
          }
          findMany: {
            args: Prisma.EspressoRecordFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EspressoRecordPayload>[]
          }
          create: {
            args: Prisma.EspressoRecordCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EspressoRecordPayload>
          }
          createMany: {
            args: Prisma.EspressoRecordCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EspressoRecordCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EspressoRecordPayload>[]
          }
          delete: {
            args: Prisma.EspressoRecordDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EspressoRecordPayload>
          }
          update: {
            args: Prisma.EspressoRecordUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EspressoRecordPayload>
          }
          deleteMany: {
            args: Prisma.EspressoRecordDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EspressoRecordUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.EspressoRecordUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EspressoRecordPayload>[]
          }
          upsert: {
            args: Prisma.EspressoRecordUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EspressoRecordPayload>
          }
          aggregate: {
            args: Prisma.EspressoRecordAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEspressoRecord>
          }
          groupBy: {
            args: Prisma.EspressoRecordGroupByArgs<ExtArgs>
            result: $Utils.Optional<EspressoRecordGroupByOutputType>[]
          }
          count: {
            args: Prisma.EspressoRecordCountArgs<ExtArgs>
            result: $Utils.Optional<EspressoRecordCountAggregateOutputType> | number
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
    roastRecord?: RoastRecordOmit
    tastingRecord?: TastingRecordOmit
    shopVisit?: ShopVisitOmit
    espressoRecord?: EspressoRecordOmit
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
   * Model RoastRecord
   */

  export type AggregateRoastRecord = {
    _count: RoastRecordCountAggregateOutputType | null
    _avg: RoastRecordAvgAggregateOutputType | null
    _sum: RoastRecordSumAggregateOutputType | null
    _min: RoastRecordMinAggregateOutputType | null
    _max: RoastRecordMaxAggregateOutputType | null
  }

  export type RoastRecordAvgAggregateOutputType = {
    weight: number | null
    charge_weight: number | null
    temperature: number | null
    humidity: number | null
    pressure: number | null
    altitude: number | null
    charge_temp: number | null
    moisture: number | null
    after_weight: number | null
    drop_temp: number | null
    color: number | null
    total_time: number | null
    acidity: number | null
    sweetness: number | null
    bitterness: number | null
    body: number | null
    balance: number | null
    nose_intensity: number | null
    aroma_intensity: number | null
    personal_score: number | null
    overall_total_score: number | null
  }

  export type RoastRecordSumAggregateOutputType = {
    weight: number | null
    charge_weight: number | null
    temperature: number | null
    humidity: number | null
    pressure: number | null
    altitude: number | null
    charge_temp: number | null
    moisture: number | null
    after_weight: number | null
    drop_temp: number | null
    color: number | null
    total_time: number | null
    acidity: number | null
    sweetness: number | null
    bitterness: number | null
    body: number | null
    balance: number | null
    nose_intensity: number | null
    aroma_intensity: number | null
    personal_score: number | null
    overall_total_score: number | null
  }

  export type RoastRecordMinAggregateOutputType = {
    id: string | null
    created_at: Date | null
    updated_at: Date | null
    bean_name: string | null
    origin: string | null
    process: string | null
    variety: string | null
    roast_date: Date | null
    weight: number | null
    charge_weight: number | null
    temperature: number | null
    humidity: number | null
    pressure: number | null
    altitude: number | null
    charge_temp: number | null
    moisture: number | null
    after_weight: number | null
    drop_temp: number | null
    color: number | null
    first_crack: Date | null
    second_crack: Date | null
    total_time: number | null
    acidity: number | null
    sweetness: number | null
    bitterness: number | null
    body: number | null
    balance: number | null
    nose_intensity: number | null
    aroma_intensity: number | null
    personal_score: number | null
    overall_total_score: number | null
    comments: string | null
    notes: string | null
    is_deleted: boolean | null
    user_id: string | null
  }

  export type RoastRecordMaxAggregateOutputType = {
    id: string | null
    created_at: Date | null
    updated_at: Date | null
    bean_name: string | null
    origin: string | null
    process: string | null
    variety: string | null
    roast_date: Date | null
    weight: number | null
    charge_weight: number | null
    temperature: number | null
    humidity: number | null
    pressure: number | null
    altitude: number | null
    charge_temp: number | null
    moisture: number | null
    after_weight: number | null
    drop_temp: number | null
    color: number | null
    first_crack: Date | null
    second_crack: Date | null
    total_time: number | null
    acidity: number | null
    sweetness: number | null
    bitterness: number | null
    body: number | null
    balance: number | null
    nose_intensity: number | null
    aroma_intensity: number | null
    personal_score: number | null
    overall_total_score: number | null
    comments: string | null
    notes: string | null
    is_deleted: boolean | null
    user_id: string | null
  }

  export type RoastRecordCountAggregateOutputType = {
    id: number
    created_at: number
    updated_at: number
    bean_name: number
    origin: number
    process: number
    variety: number
    roast_date: number
    weight: number
    charge_weight: number
    temperature: number
    humidity: number
    pressure: number
    altitude: number
    charge_temp: number
    moisture: number
    after_weight: number
    drop_temp: number
    color: number
    first_crack: number
    second_crack: number
    total_time: number
    acidity: number
    sweetness: number
    bitterness: number
    body: number
    balance: number
    nose_intensity: number
    aroma_intensity: number
    personal_score: number
    overall_total_score: number
    comments: number
    notes: number
    is_deleted: number
    user_id: number
    _all: number
  }


  export type RoastRecordAvgAggregateInputType = {
    weight?: true
    charge_weight?: true
    temperature?: true
    humidity?: true
    pressure?: true
    altitude?: true
    charge_temp?: true
    moisture?: true
    after_weight?: true
    drop_temp?: true
    color?: true
    total_time?: true
    acidity?: true
    sweetness?: true
    bitterness?: true
    body?: true
    balance?: true
    nose_intensity?: true
    aroma_intensity?: true
    personal_score?: true
    overall_total_score?: true
  }

  export type RoastRecordSumAggregateInputType = {
    weight?: true
    charge_weight?: true
    temperature?: true
    humidity?: true
    pressure?: true
    altitude?: true
    charge_temp?: true
    moisture?: true
    after_weight?: true
    drop_temp?: true
    color?: true
    total_time?: true
    acidity?: true
    sweetness?: true
    bitterness?: true
    body?: true
    balance?: true
    nose_intensity?: true
    aroma_intensity?: true
    personal_score?: true
    overall_total_score?: true
  }

  export type RoastRecordMinAggregateInputType = {
    id?: true
    created_at?: true
    updated_at?: true
    bean_name?: true
    origin?: true
    process?: true
    variety?: true
    roast_date?: true
    weight?: true
    charge_weight?: true
    temperature?: true
    humidity?: true
    pressure?: true
    altitude?: true
    charge_temp?: true
    moisture?: true
    after_weight?: true
    drop_temp?: true
    color?: true
    first_crack?: true
    second_crack?: true
    total_time?: true
    acidity?: true
    sweetness?: true
    bitterness?: true
    body?: true
    balance?: true
    nose_intensity?: true
    aroma_intensity?: true
    personal_score?: true
    overall_total_score?: true
    comments?: true
    notes?: true
    is_deleted?: true
    user_id?: true
  }

  export type RoastRecordMaxAggregateInputType = {
    id?: true
    created_at?: true
    updated_at?: true
    bean_name?: true
    origin?: true
    process?: true
    variety?: true
    roast_date?: true
    weight?: true
    charge_weight?: true
    temperature?: true
    humidity?: true
    pressure?: true
    altitude?: true
    charge_temp?: true
    moisture?: true
    after_weight?: true
    drop_temp?: true
    color?: true
    first_crack?: true
    second_crack?: true
    total_time?: true
    acidity?: true
    sweetness?: true
    bitterness?: true
    body?: true
    balance?: true
    nose_intensity?: true
    aroma_intensity?: true
    personal_score?: true
    overall_total_score?: true
    comments?: true
    notes?: true
    is_deleted?: true
    user_id?: true
  }

  export type RoastRecordCountAggregateInputType = {
    id?: true
    created_at?: true
    updated_at?: true
    bean_name?: true
    origin?: true
    process?: true
    variety?: true
    roast_date?: true
    weight?: true
    charge_weight?: true
    temperature?: true
    humidity?: true
    pressure?: true
    altitude?: true
    charge_temp?: true
    moisture?: true
    after_weight?: true
    drop_temp?: true
    color?: true
    first_crack?: true
    second_crack?: true
    total_time?: true
    acidity?: true
    sweetness?: true
    bitterness?: true
    body?: true
    balance?: true
    nose_intensity?: true
    aroma_intensity?: true
    personal_score?: true
    overall_total_score?: true
    comments?: true
    notes?: true
    is_deleted?: true
    user_id?: true
    _all?: true
  }

  export type RoastRecordAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RoastRecord to aggregate.
     */
    where?: RoastRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RoastRecords to fetch.
     */
    orderBy?: RoastRecordOrderByWithRelationInput | RoastRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RoastRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RoastRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RoastRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RoastRecords
    **/
    _count?: true | RoastRecordCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RoastRecordAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RoastRecordSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RoastRecordMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RoastRecordMaxAggregateInputType
  }

  export type GetRoastRecordAggregateType<T extends RoastRecordAggregateArgs> = {
        [P in keyof T & keyof AggregateRoastRecord]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRoastRecord[P]>
      : GetScalarType<T[P], AggregateRoastRecord[P]>
  }




  export type RoastRecordGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RoastRecordWhereInput
    orderBy?: RoastRecordOrderByWithAggregationInput | RoastRecordOrderByWithAggregationInput[]
    by: RoastRecordScalarFieldEnum[] | RoastRecordScalarFieldEnum
    having?: RoastRecordScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RoastRecordCountAggregateInputType | true
    _avg?: RoastRecordAvgAggregateInputType
    _sum?: RoastRecordSumAggregateInputType
    _min?: RoastRecordMinAggregateInputType
    _max?: RoastRecordMaxAggregateInputType
  }

  export type RoastRecordGroupByOutputType = {
    id: string
    created_at: Date
    updated_at: Date
    bean_name: string
    origin: string | null
    process: string | null
    variety: string | null
    roast_date: Date
    weight: number | null
    charge_weight: number | null
    temperature: number | null
    humidity: number | null
    pressure: number | null
    altitude: number | null
    charge_temp: number | null
    moisture: number | null
    after_weight: number | null
    drop_temp: number | null
    color: number | null
    first_crack: Date | null
    second_crack: Date | null
    total_time: number | null
    acidity: number | null
    sweetness: number | null
    bitterness: number | null
    body: number | null
    balance: number | null
    nose_intensity: number | null
    aroma_intensity: number | null
    personal_score: number | null
    overall_total_score: number | null
    comments: string | null
    notes: string | null
    is_deleted: boolean
    user_id: string | null
    _count: RoastRecordCountAggregateOutputType | null
    _avg: RoastRecordAvgAggregateOutputType | null
    _sum: RoastRecordSumAggregateOutputType | null
    _min: RoastRecordMinAggregateOutputType | null
    _max: RoastRecordMaxAggregateOutputType | null
  }

  type GetRoastRecordGroupByPayload<T extends RoastRecordGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RoastRecordGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RoastRecordGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RoastRecordGroupByOutputType[P]>
            : GetScalarType<T[P], RoastRecordGroupByOutputType[P]>
        }
      >
    >


  export type RoastRecordSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    created_at?: boolean
    updated_at?: boolean
    bean_name?: boolean
    origin?: boolean
    process?: boolean
    variety?: boolean
    roast_date?: boolean
    weight?: boolean
    charge_weight?: boolean
    temperature?: boolean
    humidity?: boolean
    pressure?: boolean
    altitude?: boolean
    charge_temp?: boolean
    moisture?: boolean
    after_weight?: boolean
    drop_temp?: boolean
    color?: boolean
    first_crack?: boolean
    second_crack?: boolean
    total_time?: boolean
    acidity?: boolean
    sweetness?: boolean
    bitterness?: boolean
    body?: boolean
    balance?: boolean
    nose_intensity?: boolean
    aroma_intensity?: boolean
    personal_score?: boolean
    overall_total_score?: boolean
    comments?: boolean
    notes?: boolean
    is_deleted?: boolean
    user_id?: boolean
  }, ExtArgs["result"]["roastRecord"]>

  export type RoastRecordSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    created_at?: boolean
    updated_at?: boolean
    bean_name?: boolean
    origin?: boolean
    process?: boolean
    variety?: boolean
    roast_date?: boolean
    weight?: boolean
    charge_weight?: boolean
    temperature?: boolean
    humidity?: boolean
    pressure?: boolean
    altitude?: boolean
    charge_temp?: boolean
    moisture?: boolean
    after_weight?: boolean
    drop_temp?: boolean
    color?: boolean
    first_crack?: boolean
    second_crack?: boolean
    total_time?: boolean
    acidity?: boolean
    sweetness?: boolean
    bitterness?: boolean
    body?: boolean
    balance?: boolean
    nose_intensity?: boolean
    aroma_intensity?: boolean
    personal_score?: boolean
    overall_total_score?: boolean
    comments?: boolean
    notes?: boolean
    is_deleted?: boolean
    user_id?: boolean
  }, ExtArgs["result"]["roastRecord"]>

  export type RoastRecordSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    created_at?: boolean
    updated_at?: boolean
    bean_name?: boolean
    origin?: boolean
    process?: boolean
    variety?: boolean
    roast_date?: boolean
    weight?: boolean
    charge_weight?: boolean
    temperature?: boolean
    humidity?: boolean
    pressure?: boolean
    altitude?: boolean
    charge_temp?: boolean
    moisture?: boolean
    after_weight?: boolean
    drop_temp?: boolean
    color?: boolean
    first_crack?: boolean
    second_crack?: boolean
    total_time?: boolean
    acidity?: boolean
    sweetness?: boolean
    bitterness?: boolean
    body?: boolean
    balance?: boolean
    nose_intensity?: boolean
    aroma_intensity?: boolean
    personal_score?: boolean
    overall_total_score?: boolean
    comments?: boolean
    notes?: boolean
    is_deleted?: boolean
    user_id?: boolean
  }, ExtArgs["result"]["roastRecord"]>

  export type RoastRecordSelectScalar = {
    id?: boolean
    created_at?: boolean
    updated_at?: boolean
    bean_name?: boolean
    origin?: boolean
    process?: boolean
    variety?: boolean
    roast_date?: boolean
    weight?: boolean
    charge_weight?: boolean
    temperature?: boolean
    humidity?: boolean
    pressure?: boolean
    altitude?: boolean
    charge_temp?: boolean
    moisture?: boolean
    after_weight?: boolean
    drop_temp?: boolean
    color?: boolean
    first_crack?: boolean
    second_crack?: boolean
    total_time?: boolean
    acidity?: boolean
    sweetness?: boolean
    bitterness?: boolean
    body?: boolean
    balance?: boolean
    nose_intensity?: boolean
    aroma_intensity?: boolean
    personal_score?: boolean
    overall_total_score?: boolean
    comments?: boolean
    notes?: boolean
    is_deleted?: boolean
    user_id?: boolean
  }

  export type RoastRecordOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "created_at" | "updated_at" | "bean_name" | "origin" | "process" | "variety" | "roast_date" | "weight" | "charge_weight" | "temperature" | "humidity" | "pressure" | "altitude" | "charge_temp" | "moisture" | "after_weight" | "drop_temp" | "color" | "first_crack" | "second_crack" | "total_time" | "acidity" | "sweetness" | "bitterness" | "body" | "balance" | "nose_intensity" | "aroma_intensity" | "personal_score" | "overall_total_score" | "comments" | "notes" | "is_deleted" | "user_id", ExtArgs["result"]["roastRecord"]>

  export type $RoastRecordPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RoastRecord"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      created_at: Date
      updated_at: Date
      bean_name: string
      origin: string | null
      process: string | null
      variety: string | null
      roast_date: Date
      weight: number | null
      charge_weight: number | null
      temperature: number | null
      humidity: number | null
      pressure: number | null
      altitude: number | null
      charge_temp: number | null
      moisture: number | null
      after_weight: number | null
      drop_temp: number | null
      color: number | null
      first_crack: Date | null
      second_crack: Date | null
      total_time: number | null
      acidity: number | null
      sweetness: number | null
      bitterness: number | null
      body: number | null
      balance: number | null
      nose_intensity: number | null
      aroma_intensity: number | null
      personal_score: number | null
      overall_total_score: number | null
      comments: string | null
      notes: string | null
      is_deleted: boolean
      user_id: string | null
    }, ExtArgs["result"]["roastRecord"]>
    composites: {}
  }

  type RoastRecordGetPayload<S extends boolean | null | undefined | RoastRecordDefaultArgs> = $Result.GetResult<Prisma.$RoastRecordPayload, S>

  type RoastRecordCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RoastRecordFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RoastRecordCountAggregateInputType | true
    }

  export interface RoastRecordDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RoastRecord'], meta: { name: 'RoastRecord' } }
    /**
     * Find zero or one RoastRecord that matches the filter.
     * @param {RoastRecordFindUniqueArgs} args - Arguments to find a RoastRecord
     * @example
     * // Get one RoastRecord
     * const roastRecord = await prisma.roastRecord.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RoastRecordFindUniqueArgs>(args: SelectSubset<T, RoastRecordFindUniqueArgs<ExtArgs>>): Prisma__RoastRecordClient<$Result.GetResult<Prisma.$RoastRecordPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one RoastRecord that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RoastRecordFindUniqueOrThrowArgs} args - Arguments to find a RoastRecord
     * @example
     * // Get one RoastRecord
     * const roastRecord = await prisma.roastRecord.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RoastRecordFindUniqueOrThrowArgs>(args: SelectSubset<T, RoastRecordFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RoastRecordClient<$Result.GetResult<Prisma.$RoastRecordPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RoastRecord that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoastRecordFindFirstArgs} args - Arguments to find a RoastRecord
     * @example
     * // Get one RoastRecord
     * const roastRecord = await prisma.roastRecord.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RoastRecordFindFirstArgs>(args?: SelectSubset<T, RoastRecordFindFirstArgs<ExtArgs>>): Prisma__RoastRecordClient<$Result.GetResult<Prisma.$RoastRecordPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RoastRecord that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoastRecordFindFirstOrThrowArgs} args - Arguments to find a RoastRecord
     * @example
     * // Get one RoastRecord
     * const roastRecord = await prisma.roastRecord.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RoastRecordFindFirstOrThrowArgs>(args?: SelectSubset<T, RoastRecordFindFirstOrThrowArgs<ExtArgs>>): Prisma__RoastRecordClient<$Result.GetResult<Prisma.$RoastRecordPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more RoastRecords that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoastRecordFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RoastRecords
     * const roastRecords = await prisma.roastRecord.findMany()
     * 
     * // Get first 10 RoastRecords
     * const roastRecords = await prisma.roastRecord.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const roastRecordWithIdOnly = await prisma.roastRecord.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RoastRecordFindManyArgs>(args?: SelectSubset<T, RoastRecordFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoastRecordPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a RoastRecord.
     * @param {RoastRecordCreateArgs} args - Arguments to create a RoastRecord.
     * @example
     * // Create one RoastRecord
     * const RoastRecord = await prisma.roastRecord.create({
     *   data: {
     *     // ... data to create a RoastRecord
     *   }
     * })
     * 
     */
    create<T extends RoastRecordCreateArgs>(args: SelectSubset<T, RoastRecordCreateArgs<ExtArgs>>): Prisma__RoastRecordClient<$Result.GetResult<Prisma.$RoastRecordPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many RoastRecords.
     * @param {RoastRecordCreateManyArgs} args - Arguments to create many RoastRecords.
     * @example
     * // Create many RoastRecords
     * const roastRecord = await prisma.roastRecord.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RoastRecordCreateManyArgs>(args?: SelectSubset<T, RoastRecordCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RoastRecords and returns the data saved in the database.
     * @param {RoastRecordCreateManyAndReturnArgs} args - Arguments to create many RoastRecords.
     * @example
     * // Create many RoastRecords
     * const roastRecord = await prisma.roastRecord.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RoastRecords and only return the `id`
     * const roastRecordWithIdOnly = await prisma.roastRecord.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RoastRecordCreateManyAndReturnArgs>(args?: SelectSubset<T, RoastRecordCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoastRecordPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a RoastRecord.
     * @param {RoastRecordDeleteArgs} args - Arguments to delete one RoastRecord.
     * @example
     * // Delete one RoastRecord
     * const RoastRecord = await prisma.roastRecord.delete({
     *   where: {
     *     // ... filter to delete one RoastRecord
     *   }
     * })
     * 
     */
    delete<T extends RoastRecordDeleteArgs>(args: SelectSubset<T, RoastRecordDeleteArgs<ExtArgs>>): Prisma__RoastRecordClient<$Result.GetResult<Prisma.$RoastRecordPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one RoastRecord.
     * @param {RoastRecordUpdateArgs} args - Arguments to update one RoastRecord.
     * @example
     * // Update one RoastRecord
     * const roastRecord = await prisma.roastRecord.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RoastRecordUpdateArgs>(args: SelectSubset<T, RoastRecordUpdateArgs<ExtArgs>>): Prisma__RoastRecordClient<$Result.GetResult<Prisma.$RoastRecordPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more RoastRecords.
     * @param {RoastRecordDeleteManyArgs} args - Arguments to filter RoastRecords to delete.
     * @example
     * // Delete a few RoastRecords
     * const { count } = await prisma.roastRecord.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RoastRecordDeleteManyArgs>(args?: SelectSubset<T, RoastRecordDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RoastRecords.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoastRecordUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RoastRecords
     * const roastRecord = await prisma.roastRecord.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RoastRecordUpdateManyArgs>(args: SelectSubset<T, RoastRecordUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RoastRecords and returns the data updated in the database.
     * @param {RoastRecordUpdateManyAndReturnArgs} args - Arguments to update many RoastRecords.
     * @example
     * // Update many RoastRecords
     * const roastRecord = await prisma.roastRecord.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more RoastRecords and only return the `id`
     * const roastRecordWithIdOnly = await prisma.roastRecord.updateManyAndReturn({
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
    updateManyAndReturn<T extends RoastRecordUpdateManyAndReturnArgs>(args: SelectSubset<T, RoastRecordUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoastRecordPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one RoastRecord.
     * @param {RoastRecordUpsertArgs} args - Arguments to update or create a RoastRecord.
     * @example
     * // Update or create a RoastRecord
     * const roastRecord = await prisma.roastRecord.upsert({
     *   create: {
     *     // ... data to create a RoastRecord
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RoastRecord we want to update
     *   }
     * })
     */
    upsert<T extends RoastRecordUpsertArgs>(args: SelectSubset<T, RoastRecordUpsertArgs<ExtArgs>>): Prisma__RoastRecordClient<$Result.GetResult<Prisma.$RoastRecordPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of RoastRecords.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoastRecordCountArgs} args - Arguments to filter RoastRecords to count.
     * @example
     * // Count the number of RoastRecords
     * const count = await prisma.roastRecord.count({
     *   where: {
     *     // ... the filter for the RoastRecords we want to count
     *   }
     * })
    **/
    count<T extends RoastRecordCountArgs>(
      args?: Subset<T, RoastRecordCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RoastRecordCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RoastRecord.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoastRecordAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends RoastRecordAggregateArgs>(args: Subset<T, RoastRecordAggregateArgs>): Prisma.PrismaPromise<GetRoastRecordAggregateType<T>>

    /**
     * Group by RoastRecord.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoastRecordGroupByArgs} args - Group by arguments.
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
      T extends RoastRecordGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RoastRecordGroupByArgs['orderBy'] }
        : { orderBy?: RoastRecordGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, RoastRecordGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRoastRecordGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RoastRecord model
   */
  readonly fields: RoastRecordFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RoastRecord.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RoastRecordClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the RoastRecord model
   */
  interface RoastRecordFieldRefs {
    readonly id: FieldRef<"RoastRecord", 'String'>
    readonly created_at: FieldRef<"RoastRecord", 'DateTime'>
    readonly updated_at: FieldRef<"RoastRecord", 'DateTime'>
    readonly bean_name: FieldRef<"RoastRecord", 'String'>
    readonly origin: FieldRef<"RoastRecord", 'String'>
    readonly process: FieldRef<"RoastRecord", 'String'>
    readonly variety: FieldRef<"RoastRecord", 'String'>
    readonly roast_date: FieldRef<"RoastRecord", 'DateTime'>
    readonly weight: FieldRef<"RoastRecord", 'Float'>
    readonly charge_weight: FieldRef<"RoastRecord", 'Float'>
    readonly temperature: FieldRef<"RoastRecord", 'Float'>
    readonly humidity: FieldRef<"RoastRecord", 'Float'>
    readonly pressure: FieldRef<"RoastRecord", 'Float'>
    readonly altitude: FieldRef<"RoastRecord", 'Float'>
    readonly charge_temp: FieldRef<"RoastRecord", 'Float'>
    readonly moisture: FieldRef<"RoastRecord", 'Float'>
    readonly after_weight: FieldRef<"RoastRecord", 'Float'>
    readonly drop_temp: FieldRef<"RoastRecord", 'Float'>
    readonly color: FieldRef<"RoastRecord", 'Float'>
    readonly first_crack: FieldRef<"RoastRecord", 'DateTime'>
    readonly second_crack: FieldRef<"RoastRecord", 'DateTime'>
    readonly total_time: FieldRef<"RoastRecord", 'Float'>
    readonly acidity: FieldRef<"RoastRecord", 'Float'>
    readonly sweetness: FieldRef<"RoastRecord", 'Float'>
    readonly bitterness: FieldRef<"RoastRecord", 'Float'>
    readonly body: FieldRef<"RoastRecord", 'Float'>
    readonly balance: FieldRef<"RoastRecord", 'Float'>
    readonly nose_intensity: FieldRef<"RoastRecord", 'Float'>
    readonly aroma_intensity: FieldRef<"RoastRecord", 'Float'>
    readonly personal_score: FieldRef<"RoastRecord", 'Float'>
    readonly overall_total_score: FieldRef<"RoastRecord", 'Float'>
    readonly comments: FieldRef<"RoastRecord", 'String'>
    readonly notes: FieldRef<"RoastRecord", 'String'>
    readonly is_deleted: FieldRef<"RoastRecord", 'Boolean'>
    readonly user_id: FieldRef<"RoastRecord", 'String'>
  }
    

  // Custom InputTypes
  /**
   * RoastRecord findUnique
   */
  export type RoastRecordFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoastRecord
     */
    select?: RoastRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoastRecord
     */
    omit?: RoastRecordOmit<ExtArgs> | null
    /**
     * Filter, which RoastRecord to fetch.
     */
    where: RoastRecordWhereUniqueInput
  }

  /**
   * RoastRecord findUniqueOrThrow
   */
  export type RoastRecordFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoastRecord
     */
    select?: RoastRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoastRecord
     */
    omit?: RoastRecordOmit<ExtArgs> | null
    /**
     * Filter, which RoastRecord to fetch.
     */
    where: RoastRecordWhereUniqueInput
  }

  /**
   * RoastRecord findFirst
   */
  export type RoastRecordFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoastRecord
     */
    select?: RoastRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoastRecord
     */
    omit?: RoastRecordOmit<ExtArgs> | null
    /**
     * Filter, which RoastRecord to fetch.
     */
    where?: RoastRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RoastRecords to fetch.
     */
    orderBy?: RoastRecordOrderByWithRelationInput | RoastRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RoastRecords.
     */
    cursor?: RoastRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RoastRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RoastRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RoastRecords.
     */
    distinct?: RoastRecordScalarFieldEnum | RoastRecordScalarFieldEnum[]
  }

  /**
   * RoastRecord findFirstOrThrow
   */
  export type RoastRecordFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoastRecord
     */
    select?: RoastRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoastRecord
     */
    omit?: RoastRecordOmit<ExtArgs> | null
    /**
     * Filter, which RoastRecord to fetch.
     */
    where?: RoastRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RoastRecords to fetch.
     */
    orderBy?: RoastRecordOrderByWithRelationInput | RoastRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RoastRecords.
     */
    cursor?: RoastRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RoastRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RoastRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RoastRecords.
     */
    distinct?: RoastRecordScalarFieldEnum | RoastRecordScalarFieldEnum[]
  }

  /**
   * RoastRecord findMany
   */
  export type RoastRecordFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoastRecord
     */
    select?: RoastRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoastRecord
     */
    omit?: RoastRecordOmit<ExtArgs> | null
    /**
     * Filter, which RoastRecords to fetch.
     */
    where?: RoastRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RoastRecords to fetch.
     */
    orderBy?: RoastRecordOrderByWithRelationInput | RoastRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RoastRecords.
     */
    cursor?: RoastRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RoastRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RoastRecords.
     */
    skip?: number
    distinct?: RoastRecordScalarFieldEnum | RoastRecordScalarFieldEnum[]
  }

  /**
   * RoastRecord create
   */
  export type RoastRecordCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoastRecord
     */
    select?: RoastRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoastRecord
     */
    omit?: RoastRecordOmit<ExtArgs> | null
    /**
     * The data needed to create a RoastRecord.
     */
    data: XOR<RoastRecordCreateInput, RoastRecordUncheckedCreateInput>
  }

  /**
   * RoastRecord createMany
   */
  export type RoastRecordCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RoastRecords.
     */
    data: RoastRecordCreateManyInput | RoastRecordCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RoastRecord createManyAndReturn
   */
  export type RoastRecordCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoastRecord
     */
    select?: RoastRecordSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RoastRecord
     */
    omit?: RoastRecordOmit<ExtArgs> | null
    /**
     * The data used to create many RoastRecords.
     */
    data: RoastRecordCreateManyInput | RoastRecordCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RoastRecord update
   */
  export type RoastRecordUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoastRecord
     */
    select?: RoastRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoastRecord
     */
    omit?: RoastRecordOmit<ExtArgs> | null
    /**
     * The data needed to update a RoastRecord.
     */
    data: XOR<RoastRecordUpdateInput, RoastRecordUncheckedUpdateInput>
    /**
     * Choose, which RoastRecord to update.
     */
    where: RoastRecordWhereUniqueInput
  }

  /**
   * RoastRecord updateMany
   */
  export type RoastRecordUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RoastRecords.
     */
    data: XOR<RoastRecordUpdateManyMutationInput, RoastRecordUncheckedUpdateManyInput>
    /**
     * Filter which RoastRecords to update
     */
    where?: RoastRecordWhereInput
    /**
     * Limit how many RoastRecords to update.
     */
    limit?: number
  }

  /**
   * RoastRecord updateManyAndReturn
   */
  export type RoastRecordUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoastRecord
     */
    select?: RoastRecordSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RoastRecord
     */
    omit?: RoastRecordOmit<ExtArgs> | null
    /**
     * The data used to update RoastRecords.
     */
    data: XOR<RoastRecordUpdateManyMutationInput, RoastRecordUncheckedUpdateManyInput>
    /**
     * Filter which RoastRecords to update
     */
    where?: RoastRecordWhereInput
    /**
     * Limit how many RoastRecords to update.
     */
    limit?: number
  }

  /**
   * RoastRecord upsert
   */
  export type RoastRecordUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoastRecord
     */
    select?: RoastRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoastRecord
     */
    omit?: RoastRecordOmit<ExtArgs> | null
    /**
     * The filter to search for the RoastRecord to update in case it exists.
     */
    where: RoastRecordWhereUniqueInput
    /**
     * In case the RoastRecord found by the `where` argument doesn't exist, create a new RoastRecord with this data.
     */
    create: XOR<RoastRecordCreateInput, RoastRecordUncheckedCreateInput>
    /**
     * In case the RoastRecord was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RoastRecordUpdateInput, RoastRecordUncheckedUpdateInput>
  }

  /**
   * RoastRecord delete
   */
  export type RoastRecordDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoastRecord
     */
    select?: RoastRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoastRecord
     */
    omit?: RoastRecordOmit<ExtArgs> | null
    /**
     * Filter which RoastRecord to delete.
     */
    where: RoastRecordWhereUniqueInput
  }

  /**
   * RoastRecord deleteMany
   */
  export type RoastRecordDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RoastRecords to delete
     */
    where?: RoastRecordWhereInput
    /**
     * Limit how many RoastRecords to delete.
     */
    limit?: number
  }

  /**
   * RoastRecord without action
   */
  export type RoastRecordDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoastRecord
     */
    select?: RoastRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoastRecord
     */
    omit?: RoastRecordOmit<ExtArgs> | null
  }


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
    altitude: number | null
  }

  export type TastingRecordSumAggregateOutputType = {
    id: number | null
    score: number | null
    altitude: number | null
  }

  export type TastingRecordMinAggregateOutputType = {
    id: number | null
    coffee_name: string | null
    score: number | null
    notes: string | null
    altitude: number | null
    created_at: Date | null
    user_id: string | null
  }

  export type TastingRecordMaxAggregateOutputType = {
    id: number | null
    coffee_name: string | null
    score: number | null
    notes: string | null
    altitude: number | null
    created_at: Date | null
    user_id: string | null
  }

  export type TastingRecordCountAggregateOutputType = {
    id: number
    coffee_name: number
    score: number
    notes: number
    altitude: number
    created_at: number
    user_id: number
    _all: number
  }


  export type TastingRecordAvgAggregateInputType = {
    id?: true
    score?: true
    altitude?: true
  }

  export type TastingRecordSumAggregateInputType = {
    id?: true
    score?: true
    altitude?: true
  }

  export type TastingRecordMinAggregateInputType = {
    id?: true
    coffee_name?: true
    score?: true
    notes?: true
    altitude?: true
    created_at?: true
    user_id?: true
  }

  export type TastingRecordMaxAggregateInputType = {
    id?: true
    coffee_name?: true
    score?: true
    notes?: true
    altitude?: true
    created_at?: true
    user_id?: true
  }

  export type TastingRecordCountAggregateInputType = {
    id?: true
    coffee_name?: true
    score?: true
    notes?: true
    altitude?: true
    created_at?: true
    user_id?: true
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
    coffee_name: string
    score: number
    notes: string | null
    altitude: number | null
    created_at: Date
    user_id: string | null
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
    coffee_name?: boolean
    score?: boolean
    notes?: boolean
    altitude?: boolean
    created_at?: boolean
    user_id?: boolean
  }, ExtArgs["result"]["tastingRecord"]>

  export type TastingRecordSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    coffee_name?: boolean
    score?: boolean
    notes?: boolean
    altitude?: boolean
    created_at?: boolean
    user_id?: boolean
  }, ExtArgs["result"]["tastingRecord"]>

  export type TastingRecordSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    coffee_name?: boolean
    score?: boolean
    notes?: boolean
    altitude?: boolean
    created_at?: boolean
    user_id?: boolean
  }, ExtArgs["result"]["tastingRecord"]>

  export type TastingRecordSelectScalar = {
    id?: boolean
    coffee_name?: boolean
    score?: boolean
    notes?: boolean
    altitude?: boolean
    created_at?: boolean
    user_id?: boolean
  }

  export type TastingRecordOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "coffee_name" | "score" | "notes" | "altitude" | "created_at" | "user_id", ExtArgs["result"]["tastingRecord"]>

  export type $TastingRecordPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TastingRecord"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      coffee_name: string
      score: number
      notes: string | null
      altitude: number | null
      created_at: Date
      user_id: string | null
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
    readonly coffee_name: FieldRef<"TastingRecord", 'String'>
    readonly score: FieldRef<"TastingRecord", 'Int'>
    readonly notes: FieldRef<"TastingRecord", 'String'>
    readonly altitude: FieldRef<"TastingRecord", 'Int'>
    readonly created_at: FieldRef<"TastingRecord", 'DateTime'>
    readonly user_id: FieldRef<"TastingRecord", 'String'>
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
   * Model ShopVisit
   */

  export type AggregateShopVisit = {
    _count: ShopVisitCountAggregateOutputType | null
    _min: ShopVisitMinAggregateOutputType | null
    _max: ShopVisitMaxAggregateOutputType | null
  }

  export type ShopVisitMinAggregateOutputType = {
    id: string | null
    comments: string | null
    staff_info: string | null
    created_at: Date | null
    user_id: string | null
  }

  export type ShopVisitMaxAggregateOutputType = {
    id: string | null
    comments: string | null
    staff_info: string | null
    created_at: Date | null
    user_id: string | null
  }

  export type ShopVisitCountAggregateOutputType = {
    id: number
    environment: number
    shop: number
    items: number
    tasting: number
    comments: number
    staff_info: number
    created_at: number
    user_id: number
    _all: number
  }


  export type ShopVisitMinAggregateInputType = {
    id?: true
    comments?: true
    staff_info?: true
    created_at?: true
    user_id?: true
  }

  export type ShopVisitMaxAggregateInputType = {
    id?: true
    comments?: true
    staff_info?: true
    created_at?: true
    user_id?: true
  }

  export type ShopVisitCountAggregateInputType = {
    id?: true
    environment?: true
    shop?: true
    items?: true
    tasting?: true
    comments?: true
    staff_info?: true
    created_at?: true
    user_id?: true
    _all?: true
  }

  export type ShopVisitAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ShopVisit to aggregate.
     */
    where?: ShopVisitWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ShopVisits to fetch.
     */
    orderBy?: ShopVisitOrderByWithRelationInput | ShopVisitOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ShopVisitWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ShopVisits from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ShopVisits.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ShopVisits
    **/
    _count?: true | ShopVisitCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ShopVisitMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ShopVisitMaxAggregateInputType
  }

  export type GetShopVisitAggregateType<T extends ShopVisitAggregateArgs> = {
        [P in keyof T & keyof AggregateShopVisit]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateShopVisit[P]>
      : GetScalarType<T[P], AggregateShopVisit[P]>
  }




  export type ShopVisitGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ShopVisitWhereInput
    orderBy?: ShopVisitOrderByWithAggregationInput | ShopVisitOrderByWithAggregationInput[]
    by: ShopVisitScalarFieldEnum[] | ShopVisitScalarFieldEnum
    having?: ShopVisitScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ShopVisitCountAggregateInputType | true
    _min?: ShopVisitMinAggregateInputType
    _max?: ShopVisitMaxAggregateInputType
  }

  export type ShopVisitGroupByOutputType = {
    id: string
    environment: JsonValue
    shop: JsonValue
    items: JsonValue
    tasting: JsonValue
    comments: string | null
    staff_info: string | null
    created_at: Date
    user_id: string | null
    _count: ShopVisitCountAggregateOutputType | null
    _min: ShopVisitMinAggregateOutputType | null
    _max: ShopVisitMaxAggregateOutputType | null
  }

  type GetShopVisitGroupByPayload<T extends ShopVisitGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ShopVisitGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ShopVisitGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ShopVisitGroupByOutputType[P]>
            : GetScalarType<T[P], ShopVisitGroupByOutputType[P]>
        }
      >
    >


  export type ShopVisitSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    environment?: boolean
    shop?: boolean
    items?: boolean
    tasting?: boolean
    comments?: boolean
    staff_info?: boolean
    created_at?: boolean
    user_id?: boolean
  }, ExtArgs["result"]["shopVisit"]>

  export type ShopVisitSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    environment?: boolean
    shop?: boolean
    items?: boolean
    tasting?: boolean
    comments?: boolean
    staff_info?: boolean
    created_at?: boolean
    user_id?: boolean
  }, ExtArgs["result"]["shopVisit"]>

  export type ShopVisitSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    environment?: boolean
    shop?: boolean
    items?: boolean
    tasting?: boolean
    comments?: boolean
    staff_info?: boolean
    created_at?: boolean
    user_id?: boolean
  }, ExtArgs["result"]["shopVisit"]>

  export type ShopVisitSelectScalar = {
    id?: boolean
    environment?: boolean
    shop?: boolean
    items?: boolean
    tasting?: boolean
    comments?: boolean
    staff_info?: boolean
    created_at?: boolean
    user_id?: boolean
  }

  export type ShopVisitOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "environment" | "shop" | "items" | "tasting" | "comments" | "staff_info" | "created_at" | "user_id", ExtArgs["result"]["shopVisit"]>

  export type $ShopVisitPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ShopVisit"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      environment: Prisma.JsonValue
      shop: Prisma.JsonValue
      items: Prisma.JsonValue
      tasting: Prisma.JsonValue
      comments: string | null
      staff_info: string | null
      created_at: Date
      user_id: string | null
    }, ExtArgs["result"]["shopVisit"]>
    composites: {}
  }

  type ShopVisitGetPayload<S extends boolean | null | undefined | ShopVisitDefaultArgs> = $Result.GetResult<Prisma.$ShopVisitPayload, S>

  type ShopVisitCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ShopVisitFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ShopVisitCountAggregateInputType | true
    }

  export interface ShopVisitDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ShopVisit'], meta: { name: 'ShopVisit' } }
    /**
     * Find zero or one ShopVisit that matches the filter.
     * @param {ShopVisitFindUniqueArgs} args - Arguments to find a ShopVisit
     * @example
     * // Get one ShopVisit
     * const shopVisit = await prisma.shopVisit.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ShopVisitFindUniqueArgs>(args: SelectSubset<T, ShopVisitFindUniqueArgs<ExtArgs>>): Prisma__ShopVisitClient<$Result.GetResult<Prisma.$ShopVisitPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ShopVisit that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ShopVisitFindUniqueOrThrowArgs} args - Arguments to find a ShopVisit
     * @example
     * // Get one ShopVisit
     * const shopVisit = await prisma.shopVisit.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ShopVisitFindUniqueOrThrowArgs>(args: SelectSubset<T, ShopVisitFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ShopVisitClient<$Result.GetResult<Prisma.$ShopVisitPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ShopVisit that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShopVisitFindFirstArgs} args - Arguments to find a ShopVisit
     * @example
     * // Get one ShopVisit
     * const shopVisit = await prisma.shopVisit.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ShopVisitFindFirstArgs>(args?: SelectSubset<T, ShopVisitFindFirstArgs<ExtArgs>>): Prisma__ShopVisitClient<$Result.GetResult<Prisma.$ShopVisitPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ShopVisit that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShopVisitFindFirstOrThrowArgs} args - Arguments to find a ShopVisit
     * @example
     * // Get one ShopVisit
     * const shopVisit = await prisma.shopVisit.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ShopVisitFindFirstOrThrowArgs>(args?: SelectSubset<T, ShopVisitFindFirstOrThrowArgs<ExtArgs>>): Prisma__ShopVisitClient<$Result.GetResult<Prisma.$ShopVisitPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ShopVisits that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShopVisitFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ShopVisits
     * const shopVisits = await prisma.shopVisit.findMany()
     * 
     * // Get first 10 ShopVisits
     * const shopVisits = await prisma.shopVisit.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const shopVisitWithIdOnly = await prisma.shopVisit.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ShopVisitFindManyArgs>(args?: SelectSubset<T, ShopVisitFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ShopVisitPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ShopVisit.
     * @param {ShopVisitCreateArgs} args - Arguments to create a ShopVisit.
     * @example
     * // Create one ShopVisit
     * const ShopVisit = await prisma.shopVisit.create({
     *   data: {
     *     // ... data to create a ShopVisit
     *   }
     * })
     * 
     */
    create<T extends ShopVisitCreateArgs>(args: SelectSubset<T, ShopVisitCreateArgs<ExtArgs>>): Prisma__ShopVisitClient<$Result.GetResult<Prisma.$ShopVisitPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ShopVisits.
     * @param {ShopVisitCreateManyArgs} args - Arguments to create many ShopVisits.
     * @example
     * // Create many ShopVisits
     * const shopVisit = await prisma.shopVisit.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ShopVisitCreateManyArgs>(args?: SelectSubset<T, ShopVisitCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ShopVisits and returns the data saved in the database.
     * @param {ShopVisitCreateManyAndReturnArgs} args - Arguments to create many ShopVisits.
     * @example
     * // Create many ShopVisits
     * const shopVisit = await prisma.shopVisit.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ShopVisits and only return the `id`
     * const shopVisitWithIdOnly = await prisma.shopVisit.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ShopVisitCreateManyAndReturnArgs>(args?: SelectSubset<T, ShopVisitCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ShopVisitPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ShopVisit.
     * @param {ShopVisitDeleteArgs} args - Arguments to delete one ShopVisit.
     * @example
     * // Delete one ShopVisit
     * const ShopVisit = await prisma.shopVisit.delete({
     *   where: {
     *     // ... filter to delete one ShopVisit
     *   }
     * })
     * 
     */
    delete<T extends ShopVisitDeleteArgs>(args: SelectSubset<T, ShopVisitDeleteArgs<ExtArgs>>): Prisma__ShopVisitClient<$Result.GetResult<Prisma.$ShopVisitPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ShopVisit.
     * @param {ShopVisitUpdateArgs} args - Arguments to update one ShopVisit.
     * @example
     * // Update one ShopVisit
     * const shopVisit = await prisma.shopVisit.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ShopVisitUpdateArgs>(args: SelectSubset<T, ShopVisitUpdateArgs<ExtArgs>>): Prisma__ShopVisitClient<$Result.GetResult<Prisma.$ShopVisitPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ShopVisits.
     * @param {ShopVisitDeleteManyArgs} args - Arguments to filter ShopVisits to delete.
     * @example
     * // Delete a few ShopVisits
     * const { count } = await prisma.shopVisit.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ShopVisitDeleteManyArgs>(args?: SelectSubset<T, ShopVisitDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ShopVisits.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShopVisitUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ShopVisits
     * const shopVisit = await prisma.shopVisit.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ShopVisitUpdateManyArgs>(args: SelectSubset<T, ShopVisitUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ShopVisits and returns the data updated in the database.
     * @param {ShopVisitUpdateManyAndReturnArgs} args - Arguments to update many ShopVisits.
     * @example
     * // Update many ShopVisits
     * const shopVisit = await prisma.shopVisit.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ShopVisits and only return the `id`
     * const shopVisitWithIdOnly = await prisma.shopVisit.updateManyAndReturn({
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
    updateManyAndReturn<T extends ShopVisitUpdateManyAndReturnArgs>(args: SelectSubset<T, ShopVisitUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ShopVisitPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ShopVisit.
     * @param {ShopVisitUpsertArgs} args - Arguments to update or create a ShopVisit.
     * @example
     * // Update or create a ShopVisit
     * const shopVisit = await prisma.shopVisit.upsert({
     *   create: {
     *     // ... data to create a ShopVisit
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ShopVisit we want to update
     *   }
     * })
     */
    upsert<T extends ShopVisitUpsertArgs>(args: SelectSubset<T, ShopVisitUpsertArgs<ExtArgs>>): Prisma__ShopVisitClient<$Result.GetResult<Prisma.$ShopVisitPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ShopVisits.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShopVisitCountArgs} args - Arguments to filter ShopVisits to count.
     * @example
     * // Count the number of ShopVisits
     * const count = await prisma.shopVisit.count({
     *   where: {
     *     // ... the filter for the ShopVisits we want to count
     *   }
     * })
    **/
    count<T extends ShopVisitCountArgs>(
      args?: Subset<T, ShopVisitCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ShopVisitCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ShopVisit.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShopVisitAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ShopVisitAggregateArgs>(args: Subset<T, ShopVisitAggregateArgs>): Prisma.PrismaPromise<GetShopVisitAggregateType<T>>

    /**
     * Group by ShopVisit.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShopVisitGroupByArgs} args - Group by arguments.
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
      T extends ShopVisitGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ShopVisitGroupByArgs['orderBy'] }
        : { orderBy?: ShopVisitGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ShopVisitGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetShopVisitGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ShopVisit model
   */
  readonly fields: ShopVisitFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ShopVisit.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ShopVisitClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the ShopVisit model
   */
  interface ShopVisitFieldRefs {
    readonly id: FieldRef<"ShopVisit", 'String'>
    readonly environment: FieldRef<"ShopVisit", 'Json'>
    readonly shop: FieldRef<"ShopVisit", 'Json'>
    readonly items: FieldRef<"ShopVisit", 'Json'>
    readonly tasting: FieldRef<"ShopVisit", 'Json'>
    readonly comments: FieldRef<"ShopVisit", 'String'>
    readonly staff_info: FieldRef<"ShopVisit", 'String'>
    readonly created_at: FieldRef<"ShopVisit", 'DateTime'>
    readonly user_id: FieldRef<"ShopVisit", 'String'>
  }
    

  // Custom InputTypes
  /**
   * ShopVisit findUnique
   */
  export type ShopVisitFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShopVisit
     */
    select?: ShopVisitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ShopVisit
     */
    omit?: ShopVisitOmit<ExtArgs> | null
    /**
     * Filter, which ShopVisit to fetch.
     */
    where: ShopVisitWhereUniqueInput
  }

  /**
   * ShopVisit findUniqueOrThrow
   */
  export type ShopVisitFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShopVisit
     */
    select?: ShopVisitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ShopVisit
     */
    omit?: ShopVisitOmit<ExtArgs> | null
    /**
     * Filter, which ShopVisit to fetch.
     */
    where: ShopVisitWhereUniqueInput
  }

  /**
   * ShopVisit findFirst
   */
  export type ShopVisitFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShopVisit
     */
    select?: ShopVisitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ShopVisit
     */
    omit?: ShopVisitOmit<ExtArgs> | null
    /**
     * Filter, which ShopVisit to fetch.
     */
    where?: ShopVisitWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ShopVisits to fetch.
     */
    orderBy?: ShopVisitOrderByWithRelationInput | ShopVisitOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ShopVisits.
     */
    cursor?: ShopVisitWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ShopVisits from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ShopVisits.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ShopVisits.
     */
    distinct?: ShopVisitScalarFieldEnum | ShopVisitScalarFieldEnum[]
  }

  /**
   * ShopVisit findFirstOrThrow
   */
  export type ShopVisitFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShopVisit
     */
    select?: ShopVisitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ShopVisit
     */
    omit?: ShopVisitOmit<ExtArgs> | null
    /**
     * Filter, which ShopVisit to fetch.
     */
    where?: ShopVisitWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ShopVisits to fetch.
     */
    orderBy?: ShopVisitOrderByWithRelationInput | ShopVisitOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ShopVisits.
     */
    cursor?: ShopVisitWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ShopVisits from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ShopVisits.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ShopVisits.
     */
    distinct?: ShopVisitScalarFieldEnum | ShopVisitScalarFieldEnum[]
  }

  /**
   * ShopVisit findMany
   */
  export type ShopVisitFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShopVisit
     */
    select?: ShopVisitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ShopVisit
     */
    omit?: ShopVisitOmit<ExtArgs> | null
    /**
     * Filter, which ShopVisits to fetch.
     */
    where?: ShopVisitWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ShopVisits to fetch.
     */
    orderBy?: ShopVisitOrderByWithRelationInput | ShopVisitOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ShopVisits.
     */
    cursor?: ShopVisitWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ShopVisits from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ShopVisits.
     */
    skip?: number
    distinct?: ShopVisitScalarFieldEnum | ShopVisitScalarFieldEnum[]
  }

  /**
   * ShopVisit create
   */
  export type ShopVisitCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShopVisit
     */
    select?: ShopVisitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ShopVisit
     */
    omit?: ShopVisitOmit<ExtArgs> | null
    /**
     * The data needed to create a ShopVisit.
     */
    data: XOR<ShopVisitCreateInput, ShopVisitUncheckedCreateInput>
  }

  /**
   * ShopVisit createMany
   */
  export type ShopVisitCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ShopVisits.
     */
    data: ShopVisitCreateManyInput | ShopVisitCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ShopVisit createManyAndReturn
   */
  export type ShopVisitCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShopVisit
     */
    select?: ShopVisitSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ShopVisit
     */
    omit?: ShopVisitOmit<ExtArgs> | null
    /**
     * The data used to create many ShopVisits.
     */
    data: ShopVisitCreateManyInput | ShopVisitCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ShopVisit update
   */
  export type ShopVisitUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShopVisit
     */
    select?: ShopVisitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ShopVisit
     */
    omit?: ShopVisitOmit<ExtArgs> | null
    /**
     * The data needed to update a ShopVisit.
     */
    data: XOR<ShopVisitUpdateInput, ShopVisitUncheckedUpdateInput>
    /**
     * Choose, which ShopVisit to update.
     */
    where: ShopVisitWhereUniqueInput
  }

  /**
   * ShopVisit updateMany
   */
  export type ShopVisitUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ShopVisits.
     */
    data: XOR<ShopVisitUpdateManyMutationInput, ShopVisitUncheckedUpdateManyInput>
    /**
     * Filter which ShopVisits to update
     */
    where?: ShopVisitWhereInput
    /**
     * Limit how many ShopVisits to update.
     */
    limit?: number
  }

  /**
   * ShopVisit updateManyAndReturn
   */
  export type ShopVisitUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShopVisit
     */
    select?: ShopVisitSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ShopVisit
     */
    omit?: ShopVisitOmit<ExtArgs> | null
    /**
     * The data used to update ShopVisits.
     */
    data: XOR<ShopVisitUpdateManyMutationInput, ShopVisitUncheckedUpdateManyInput>
    /**
     * Filter which ShopVisits to update
     */
    where?: ShopVisitWhereInput
    /**
     * Limit how many ShopVisits to update.
     */
    limit?: number
  }

  /**
   * ShopVisit upsert
   */
  export type ShopVisitUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShopVisit
     */
    select?: ShopVisitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ShopVisit
     */
    omit?: ShopVisitOmit<ExtArgs> | null
    /**
     * The filter to search for the ShopVisit to update in case it exists.
     */
    where: ShopVisitWhereUniqueInput
    /**
     * In case the ShopVisit found by the `where` argument doesn't exist, create a new ShopVisit with this data.
     */
    create: XOR<ShopVisitCreateInput, ShopVisitUncheckedCreateInput>
    /**
     * In case the ShopVisit was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ShopVisitUpdateInput, ShopVisitUncheckedUpdateInput>
  }

  /**
   * ShopVisit delete
   */
  export type ShopVisitDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShopVisit
     */
    select?: ShopVisitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ShopVisit
     */
    omit?: ShopVisitOmit<ExtArgs> | null
    /**
     * Filter which ShopVisit to delete.
     */
    where: ShopVisitWhereUniqueInput
  }

  /**
   * ShopVisit deleteMany
   */
  export type ShopVisitDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ShopVisits to delete
     */
    where?: ShopVisitWhereInput
    /**
     * Limit how many ShopVisits to delete.
     */
    limit?: number
  }

  /**
   * ShopVisit without action
   */
  export type ShopVisitDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShopVisit
     */
    select?: ShopVisitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ShopVisit
     */
    omit?: ShopVisitOmit<ExtArgs> | null
  }


  /**
   * Model EspressoRecord
   */

  export type AggregateEspressoRecord = {
    _count: EspressoRecordCountAggregateOutputType | null
    _avg: EspressoRecordAvgAggregateOutputType | null
    _sum: EspressoRecordSumAggregateOutputType | null
    _min: EspressoRecordMinAggregateOutputType | null
    _max: EspressoRecordMaxAggregateOutputType | null
  }

  export type EspressoRecordAvgAggregateOutputType = {
    personal_score: number | null
  }

  export type EspressoRecordSumAggregateOutputType = {
    personal_score: number | null
  }

  export type EspressoRecordMinAggregateOutputType = {
    id: string | null
    created_at: Date | null
    updated_at: Date | null
    personal_score: number | null
    comments: string | null
    is_deleted: boolean | null
    user_id: string | null
  }

  export type EspressoRecordMaxAggregateOutputType = {
    id: string | null
    created_at: Date | null
    updated_at: Date | null
    personal_score: number | null
    comments: string | null
    is_deleted: boolean | null
    user_id: string | null
  }

  export type EspressoRecordCountAggregateOutputType = {
    id: number
    created_at: number
    updated_at: number
    coffee: number
    environment: number
    brewing: number
    crema: number
    tasting: number
    nose: number
    aroma: number
    personal_score: number
    comments: number
    is_deleted: number
    user_id: number
    _all: number
  }


  export type EspressoRecordAvgAggregateInputType = {
    personal_score?: true
  }

  export type EspressoRecordSumAggregateInputType = {
    personal_score?: true
  }

  export type EspressoRecordMinAggregateInputType = {
    id?: true
    created_at?: true
    updated_at?: true
    personal_score?: true
    comments?: true
    is_deleted?: true
    user_id?: true
  }

  export type EspressoRecordMaxAggregateInputType = {
    id?: true
    created_at?: true
    updated_at?: true
    personal_score?: true
    comments?: true
    is_deleted?: true
    user_id?: true
  }

  export type EspressoRecordCountAggregateInputType = {
    id?: true
    created_at?: true
    updated_at?: true
    coffee?: true
    environment?: true
    brewing?: true
    crema?: true
    tasting?: true
    nose?: true
    aroma?: true
    personal_score?: true
    comments?: true
    is_deleted?: true
    user_id?: true
    _all?: true
  }

  export type EspressoRecordAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EspressoRecord to aggregate.
     */
    where?: EspressoRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EspressoRecords to fetch.
     */
    orderBy?: EspressoRecordOrderByWithRelationInput | EspressoRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EspressoRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EspressoRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EspressoRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned EspressoRecords
    **/
    _count?: true | EspressoRecordCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: EspressoRecordAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: EspressoRecordSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EspressoRecordMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EspressoRecordMaxAggregateInputType
  }

  export type GetEspressoRecordAggregateType<T extends EspressoRecordAggregateArgs> = {
        [P in keyof T & keyof AggregateEspressoRecord]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEspressoRecord[P]>
      : GetScalarType<T[P], AggregateEspressoRecord[P]>
  }




  export type EspressoRecordGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EspressoRecordWhereInput
    orderBy?: EspressoRecordOrderByWithAggregationInput | EspressoRecordOrderByWithAggregationInput[]
    by: EspressoRecordScalarFieldEnum[] | EspressoRecordScalarFieldEnum
    having?: EspressoRecordScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EspressoRecordCountAggregateInputType | true
    _avg?: EspressoRecordAvgAggregateInputType
    _sum?: EspressoRecordSumAggregateInputType
    _min?: EspressoRecordMinAggregateInputType
    _max?: EspressoRecordMaxAggregateInputType
  }

  export type EspressoRecordGroupByOutputType = {
    id: string
    created_at: Date
    updated_at: Date
    coffee: JsonValue
    environment: JsonValue
    brewing: JsonValue
    crema: JsonValue
    tasting: JsonValue
    nose: JsonValue
    aroma: JsonValue
    personal_score: number | null
    comments: string | null
    is_deleted: boolean
    user_id: string | null
    _count: EspressoRecordCountAggregateOutputType | null
    _avg: EspressoRecordAvgAggregateOutputType | null
    _sum: EspressoRecordSumAggregateOutputType | null
    _min: EspressoRecordMinAggregateOutputType | null
    _max: EspressoRecordMaxAggregateOutputType | null
  }

  type GetEspressoRecordGroupByPayload<T extends EspressoRecordGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EspressoRecordGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EspressoRecordGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EspressoRecordGroupByOutputType[P]>
            : GetScalarType<T[P], EspressoRecordGroupByOutputType[P]>
        }
      >
    >


  export type EspressoRecordSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    created_at?: boolean
    updated_at?: boolean
    coffee?: boolean
    environment?: boolean
    brewing?: boolean
    crema?: boolean
    tasting?: boolean
    nose?: boolean
    aroma?: boolean
    personal_score?: boolean
    comments?: boolean
    is_deleted?: boolean
    user_id?: boolean
  }, ExtArgs["result"]["espressoRecord"]>

  export type EspressoRecordSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    created_at?: boolean
    updated_at?: boolean
    coffee?: boolean
    environment?: boolean
    brewing?: boolean
    crema?: boolean
    tasting?: boolean
    nose?: boolean
    aroma?: boolean
    personal_score?: boolean
    comments?: boolean
    is_deleted?: boolean
    user_id?: boolean
  }, ExtArgs["result"]["espressoRecord"]>

  export type EspressoRecordSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    created_at?: boolean
    updated_at?: boolean
    coffee?: boolean
    environment?: boolean
    brewing?: boolean
    crema?: boolean
    tasting?: boolean
    nose?: boolean
    aroma?: boolean
    personal_score?: boolean
    comments?: boolean
    is_deleted?: boolean
    user_id?: boolean
  }, ExtArgs["result"]["espressoRecord"]>

  export type EspressoRecordSelectScalar = {
    id?: boolean
    created_at?: boolean
    updated_at?: boolean
    coffee?: boolean
    environment?: boolean
    brewing?: boolean
    crema?: boolean
    tasting?: boolean
    nose?: boolean
    aroma?: boolean
    personal_score?: boolean
    comments?: boolean
    is_deleted?: boolean
    user_id?: boolean
  }

  export type EspressoRecordOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "created_at" | "updated_at" | "coffee" | "environment" | "brewing" | "crema" | "tasting" | "nose" | "aroma" | "personal_score" | "comments" | "is_deleted" | "user_id", ExtArgs["result"]["espressoRecord"]>

  export type $EspressoRecordPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "EspressoRecord"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      created_at: Date
      updated_at: Date
      coffee: Prisma.JsonValue
      environment: Prisma.JsonValue
      brewing: Prisma.JsonValue
      crema: Prisma.JsonValue
      tasting: Prisma.JsonValue
      nose: Prisma.JsonValue
      aroma: Prisma.JsonValue
      personal_score: number | null
      comments: string | null
      is_deleted: boolean
      user_id: string | null
    }, ExtArgs["result"]["espressoRecord"]>
    composites: {}
  }

  type EspressoRecordGetPayload<S extends boolean | null | undefined | EspressoRecordDefaultArgs> = $Result.GetResult<Prisma.$EspressoRecordPayload, S>

  type EspressoRecordCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EspressoRecordFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EspressoRecordCountAggregateInputType | true
    }

  export interface EspressoRecordDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['EspressoRecord'], meta: { name: 'EspressoRecord' } }
    /**
     * Find zero or one EspressoRecord that matches the filter.
     * @param {EspressoRecordFindUniqueArgs} args - Arguments to find a EspressoRecord
     * @example
     * // Get one EspressoRecord
     * const espressoRecord = await prisma.espressoRecord.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EspressoRecordFindUniqueArgs>(args: SelectSubset<T, EspressoRecordFindUniqueArgs<ExtArgs>>): Prisma__EspressoRecordClient<$Result.GetResult<Prisma.$EspressoRecordPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one EspressoRecord that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EspressoRecordFindUniqueOrThrowArgs} args - Arguments to find a EspressoRecord
     * @example
     * // Get one EspressoRecord
     * const espressoRecord = await prisma.espressoRecord.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EspressoRecordFindUniqueOrThrowArgs>(args: SelectSubset<T, EspressoRecordFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EspressoRecordClient<$Result.GetResult<Prisma.$EspressoRecordPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EspressoRecord that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EspressoRecordFindFirstArgs} args - Arguments to find a EspressoRecord
     * @example
     * // Get one EspressoRecord
     * const espressoRecord = await prisma.espressoRecord.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EspressoRecordFindFirstArgs>(args?: SelectSubset<T, EspressoRecordFindFirstArgs<ExtArgs>>): Prisma__EspressoRecordClient<$Result.GetResult<Prisma.$EspressoRecordPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EspressoRecord that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EspressoRecordFindFirstOrThrowArgs} args - Arguments to find a EspressoRecord
     * @example
     * // Get one EspressoRecord
     * const espressoRecord = await prisma.espressoRecord.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EspressoRecordFindFirstOrThrowArgs>(args?: SelectSubset<T, EspressoRecordFindFirstOrThrowArgs<ExtArgs>>): Prisma__EspressoRecordClient<$Result.GetResult<Prisma.$EspressoRecordPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more EspressoRecords that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EspressoRecordFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all EspressoRecords
     * const espressoRecords = await prisma.espressoRecord.findMany()
     * 
     * // Get first 10 EspressoRecords
     * const espressoRecords = await prisma.espressoRecord.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const espressoRecordWithIdOnly = await prisma.espressoRecord.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EspressoRecordFindManyArgs>(args?: SelectSubset<T, EspressoRecordFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EspressoRecordPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a EspressoRecord.
     * @param {EspressoRecordCreateArgs} args - Arguments to create a EspressoRecord.
     * @example
     * // Create one EspressoRecord
     * const EspressoRecord = await prisma.espressoRecord.create({
     *   data: {
     *     // ... data to create a EspressoRecord
     *   }
     * })
     * 
     */
    create<T extends EspressoRecordCreateArgs>(args: SelectSubset<T, EspressoRecordCreateArgs<ExtArgs>>): Prisma__EspressoRecordClient<$Result.GetResult<Prisma.$EspressoRecordPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many EspressoRecords.
     * @param {EspressoRecordCreateManyArgs} args - Arguments to create many EspressoRecords.
     * @example
     * // Create many EspressoRecords
     * const espressoRecord = await prisma.espressoRecord.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EspressoRecordCreateManyArgs>(args?: SelectSubset<T, EspressoRecordCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many EspressoRecords and returns the data saved in the database.
     * @param {EspressoRecordCreateManyAndReturnArgs} args - Arguments to create many EspressoRecords.
     * @example
     * // Create many EspressoRecords
     * const espressoRecord = await prisma.espressoRecord.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many EspressoRecords and only return the `id`
     * const espressoRecordWithIdOnly = await prisma.espressoRecord.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EspressoRecordCreateManyAndReturnArgs>(args?: SelectSubset<T, EspressoRecordCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EspressoRecordPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a EspressoRecord.
     * @param {EspressoRecordDeleteArgs} args - Arguments to delete one EspressoRecord.
     * @example
     * // Delete one EspressoRecord
     * const EspressoRecord = await prisma.espressoRecord.delete({
     *   where: {
     *     // ... filter to delete one EspressoRecord
     *   }
     * })
     * 
     */
    delete<T extends EspressoRecordDeleteArgs>(args: SelectSubset<T, EspressoRecordDeleteArgs<ExtArgs>>): Prisma__EspressoRecordClient<$Result.GetResult<Prisma.$EspressoRecordPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one EspressoRecord.
     * @param {EspressoRecordUpdateArgs} args - Arguments to update one EspressoRecord.
     * @example
     * // Update one EspressoRecord
     * const espressoRecord = await prisma.espressoRecord.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EspressoRecordUpdateArgs>(args: SelectSubset<T, EspressoRecordUpdateArgs<ExtArgs>>): Prisma__EspressoRecordClient<$Result.GetResult<Prisma.$EspressoRecordPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more EspressoRecords.
     * @param {EspressoRecordDeleteManyArgs} args - Arguments to filter EspressoRecords to delete.
     * @example
     * // Delete a few EspressoRecords
     * const { count } = await prisma.espressoRecord.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EspressoRecordDeleteManyArgs>(args?: SelectSubset<T, EspressoRecordDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EspressoRecords.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EspressoRecordUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many EspressoRecords
     * const espressoRecord = await prisma.espressoRecord.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EspressoRecordUpdateManyArgs>(args: SelectSubset<T, EspressoRecordUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EspressoRecords and returns the data updated in the database.
     * @param {EspressoRecordUpdateManyAndReturnArgs} args - Arguments to update many EspressoRecords.
     * @example
     * // Update many EspressoRecords
     * const espressoRecord = await prisma.espressoRecord.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more EspressoRecords and only return the `id`
     * const espressoRecordWithIdOnly = await prisma.espressoRecord.updateManyAndReturn({
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
    updateManyAndReturn<T extends EspressoRecordUpdateManyAndReturnArgs>(args: SelectSubset<T, EspressoRecordUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EspressoRecordPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one EspressoRecord.
     * @param {EspressoRecordUpsertArgs} args - Arguments to update or create a EspressoRecord.
     * @example
     * // Update or create a EspressoRecord
     * const espressoRecord = await prisma.espressoRecord.upsert({
     *   create: {
     *     // ... data to create a EspressoRecord
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the EspressoRecord we want to update
     *   }
     * })
     */
    upsert<T extends EspressoRecordUpsertArgs>(args: SelectSubset<T, EspressoRecordUpsertArgs<ExtArgs>>): Prisma__EspressoRecordClient<$Result.GetResult<Prisma.$EspressoRecordPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of EspressoRecords.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EspressoRecordCountArgs} args - Arguments to filter EspressoRecords to count.
     * @example
     * // Count the number of EspressoRecords
     * const count = await prisma.espressoRecord.count({
     *   where: {
     *     // ... the filter for the EspressoRecords we want to count
     *   }
     * })
    **/
    count<T extends EspressoRecordCountArgs>(
      args?: Subset<T, EspressoRecordCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EspressoRecordCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a EspressoRecord.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EspressoRecordAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends EspressoRecordAggregateArgs>(args: Subset<T, EspressoRecordAggregateArgs>): Prisma.PrismaPromise<GetEspressoRecordAggregateType<T>>

    /**
     * Group by EspressoRecord.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EspressoRecordGroupByArgs} args - Group by arguments.
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
      T extends EspressoRecordGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EspressoRecordGroupByArgs['orderBy'] }
        : { orderBy?: EspressoRecordGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, EspressoRecordGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEspressoRecordGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the EspressoRecord model
   */
  readonly fields: EspressoRecordFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for EspressoRecord.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EspressoRecordClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the EspressoRecord model
   */
  interface EspressoRecordFieldRefs {
    readonly id: FieldRef<"EspressoRecord", 'String'>
    readonly created_at: FieldRef<"EspressoRecord", 'DateTime'>
    readonly updated_at: FieldRef<"EspressoRecord", 'DateTime'>
    readonly coffee: FieldRef<"EspressoRecord", 'Json'>
    readonly environment: FieldRef<"EspressoRecord", 'Json'>
    readonly brewing: FieldRef<"EspressoRecord", 'Json'>
    readonly crema: FieldRef<"EspressoRecord", 'Json'>
    readonly tasting: FieldRef<"EspressoRecord", 'Json'>
    readonly nose: FieldRef<"EspressoRecord", 'Json'>
    readonly aroma: FieldRef<"EspressoRecord", 'Json'>
    readonly personal_score: FieldRef<"EspressoRecord", 'Int'>
    readonly comments: FieldRef<"EspressoRecord", 'String'>
    readonly is_deleted: FieldRef<"EspressoRecord", 'Boolean'>
    readonly user_id: FieldRef<"EspressoRecord", 'String'>
  }
    

  // Custom InputTypes
  /**
   * EspressoRecord findUnique
   */
  export type EspressoRecordFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EspressoRecord
     */
    select?: EspressoRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EspressoRecord
     */
    omit?: EspressoRecordOmit<ExtArgs> | null
    /**
     * Filter, which EspressoRecord to fetch.
     */
    where: EspressoRecordWhereUniqueInput
  }

  /**
   * EspressoRecord findUniqueOrThrow
   */
  export type EspressoRecordFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EspressoRecord
     */
    select?: EspressoRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EspressoRecord
     */
    omit?: EspressoRecordOmit<ExtArgs> | null
    /**
     * Filter, which EspressoRecord to fetch.
     */
    where: EspressoRecordWhereUniqueInput
  }

  /**
   * EspressoRecord findFirst
   */
  export type EspressoRecordFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EspressoRecord
     */
    select?: EspressoRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EspressoRecord
     */
    omit?: EspressoRecordOmit<ExtArgs> | null
    /**
     * Filter, which EspressoRecord to fetch.
     */
    where?: EspressoRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EspressoRecords to fetch.
     */
    orderBy?: EspressoRecordOrderByWithRelationInput | EspressoRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EspressoRecords.
     */
    cursor?: EspressoRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EspressoRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EspressoRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EspressoRecords.
     */
    distinct?: EspressoRecordScalarFieldEnum | EspressoRecordScalarFieldEnum[]
  }

  /**
   * EspressoRecord findFirstOrThrow
   */
  export type EspressoRecordFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EspressoRecord
     */
    select?: EspressoRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EspressoRecord
     */
    omit?: EspressoRecordOmit<ExtArgs> | null
    /**
     * Filter, which EspressoRecord to fetch.
     */
    where?: EspressoRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EspressoRecords to fetch.
     */
    orderBy?: EspressoRecordOrderByWithRelationInput | EspressoRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EspressoRecords.
     */
    cursor?: EspressoRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EspressoRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EspressoRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EspressoRecords.
     */
    distinct?: EspressoRecordScalarFieldEnum | EspressoRecordScalarFieldEnum[]
  }

  /**
   * EspressoRecord findMany
   */
  export type EspressoRecordFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EspressoRecord
     */
    select?: EspressoRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EspressoRecord
     */
    omit?: EspressoRecordOmit<ExtArgs> | null
    /**
     * Filter, which EspressoRecords to fetch.
     */
    where?: EspressoRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EspressoRecords to fetch.
     */
    orderBy?: EspressoRecordOrderByWithRelationInput | EspressoRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing EspressoRecords.
     */
    cursor?: EspressoRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EspressoRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EspressoRecords.
     */
    skip?: number
    distinct?: EspressoRecordScalarFieldEnum | EspressoRecordScalarFieldEnum[]
  }

  /**
   * EspressoRecord create
   */
  export type EspressoRecordCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EspressoRecord
     */
    select?: EspressoRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EspressoRecord
     */
    omit?: EspressoRecordOmit<ExtArgs> | null
    /**
     * The data needed to create a EspressoRecord.
     */
    data: XOR<EspressoRecordCreateInput, EspressoRecordUncheckedCreateInput>
  }

  /**
   * EspressoRecord createMany
   */
  export type EspressoRecordCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many EspressoRecords.
     */
    data: EspressoRecordCreateManyInput | EspressoRecordCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * EspressoRecord createManyAndReturn
   */
  export type EspressoRecordCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EspressoRecord
     */
    select?: EspressoRecordSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the EspressoRecord
     */
    omit?: EspressoRecordOmit<ExtArgs> | null
    /**
     * The data used to create many EspressoRecords.
     */
    data: EspressoRecordCreateManyInput | EspressoRecordCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * EspressoRecord update
   */
  export type EspressoRecordUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EspressoRecord
     */
    select?: EspressoRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EspressoRecord
     */
    omit?: EspressoRecordOmit<ExtArgs> | null
    /**
     * The data needed to update a EspressoRecord.
     */
    data: XOR<EspressoRecordUpdateInput, EspressoRecordUncheckedUpdateInput>
    /**
     * Choose, which EspressoRecord to update.
     */
    where: EspressoRecordWhereUniqueInput
  }

  /**
   * EspressoRecord updateMany
   */
  export type EspressoRecordUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update EspressoRecords.
     */
    data: XOR<EspressoRecordUpdateManyMutationInput, EspressoRecordUncheckedUpdateManyInput>
    /**
     * Filter which EspressoRecords to update
     */
    where?: EspressoRecordWhereInput
    /**
     * Limit how many EspressoRecords to update.
     */
    limit?: number
  }

  /**
   * EspressoRecord updateManyAndReturn
   */
  export type EspressoRecordUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EspressoRecord
     */
    select?: EspressoRecordSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the EspressoRecord
     */
    omit?: EspressoRecordOmit<ExtArgs> | null
    /**
     * The data used to update EspressoRecords.
     */
    data: XOR<EspressoRecordUpdateManyMutationInput, EspressoRecordUncheckedUpdateManyInput>
    /**
     * Filter which EspressoRecords to update
     */
    where?: EspressoRecordWhereInput
    /**
     * Limit how many EspressoRecords to update.
     */
    limit?: number
  }

  /**
   * EspressoRecord upsert
   */
  export type EspressoRecordUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EspressoRecord
     */
    select?: EspressoRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EspressoRecord
     */
    omit?: EspressoRecordOmit<ExtArgs> | null
    /**
     * The filter to search for the EspressoRecord to update in case it exists.
     */
    where: EspressoRecordWhereUniqueInput
    /**
     * In case the EspressoRecord found by the `where` argument doesn't exist, create a new EspressoRecord with this data.
     */
    create: XOR<EspressoRecordCreateInput, EspressoRecordUncheckedCreateInput>
    /**
     * In case the EspressoRecord was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EspressoRecordUpdateInput, EspressoRecordUncheckedUpdateInput>
  }

  /**
   * EspressoRecord delete
   */
  export type EspressoRecordDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EspressoRecord
     */
    select?: EspressoRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EspressoRecord
     */
    omit?: EspressoRecordOmit<ExtArgs> | null
    /**
     * Filter which EspressoRecord to delete.
     */
    where: EspressoRecordWhereUniqueInput
  }

  /**
   * EspressoRecord deleteMany
   */
  export type EspressoRecordDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EspressoRecords to delete
     */
    where?: EspressoRecordWhereInput
    /**
     * Limit how many EspressoRecords to delete.
     */
    limit?: number
  }

  /**
   * EspressoRecord without action
   */
  export type EspressoRecordDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EspressoRecord
     */
    select?: EspressoRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EspressoRecord
     */
    omit?: EspressoRecordOmit<ExtArgs> | null
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


  export const RoastRecordScalarFieldEnum: {
    id: 'id',
    created_at: 'created_at',
    updated_at: 'updated_at',
    bean_name: 'bean_name',
    origin: 'origin',
    process: 'process',
    variety: 'variety',
    roast_date: 'roast_date',
    weight: 'weight',
    charge_weight: 'charge_weight',
    temperature: 'temperature',
    humidity: 'humidity',
    pressure: 'pressure',
    altitude: 'altitude',
    charge_temp: 'charge_temp',
    moisture: 'moisture',
    after_weight: 'after_weight',
    drop_temp: 'drop_temp',
    color: 'color',
    first_crack: 'first_crack',
    second_crack: 'second_crack',
    total_time: 'total_time',
    acidity: 'acidity',
    sweetness: 'sweetness',
    bitterness: 'bitterness',
    body: 'body',
    balance: 'balance',
    nose_intensity: 'nose_intensity',
    aroma_intensity: 'aroma_intensity',
    personal_score: 'personal_score',
    overall_total_score: 'overall_total_score',
    comments: 'comments',
    notes: 'notes',
    is_deleted: 'is_deleted',
    user_id: 'user_id'
  };

  export type RoastRecordScalarFieldEnum = (typeof RoastRecordScalarFieldEnum)[keyof typeof RoastRecordScalarFieldEnum]


  export const TastingRecordScalarFieldEnum: {
    id: 'id',
    coffee_name: 'coffee_name',
    score: 'score',
    notes: 'notes',
    altitude: 'altitude',
    created_at: 'created_at',
    user_id: 'user_id'
  };

  export type TastingRecordScalarFieldEnum = (typeof TastingRecordScalarFieldEnum)[keyof typeof TastingRecordScalarFieldEnum]


  export const ShopVisitScalarFieldEnum: {
    id: 'id',
    environment: 'environment',
    shop: 'shop',
    items: 'items',
    tasting: 'tasting',
    comments: 'comments',
    staff_info: 'staff_info',
    created_at: 'created_at',
    user_id: 'user_id'
  };

  export type ShopVisitScalarFieldEnum = (typeof ShopVisitScalarFieldEnum)[keyof typeof ShopVisitScalarFieldEnum]


  export const EspressoRecordScalarFieldEnum: {
    id: 'id',
    created_at: 'created_at',
    updated_at: 'updated_at',
    coffee: 'coffee',
    environment: 'environment',
    brewing: 'brewing',
    crema: 'crema',
    tasting: 'tasting',
    nose: 'nose',
    aroma: 'aroma',
    personal_score: 'personal_score',
    comments: 'comments',
    is_deleted: 'is_deleted',
    user_id: 'user_id'
  };

  export type EspressoRecordScalarFieldEnum = (typeof EspressoRecordScalarFieldEnum)[keyof typeof EspressoRecordScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


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


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


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
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    
  /**
   * Deep Input Types
   */


  export type RoastRecordWhereInput = {
    AND?: RoastRecordWhereInput | RoastRecordWhereInput[]
    OR?: RoastRecordWhereInput[]
    NOT?: RoastRecordWhereInput | RoastRecordWhereInput[]
    id?: UuidFilter<"RoastRecord"> | string
    created_at?: DateTimeFilter<"RoastRecord"> | Date | string
    updated_at?: DateTimeFilter<"RoastRecord"> | Date | string
    bean_name?: StringFilter<"RoastRecord"> | string
    origin?: StringNullableFilter<"RoastRecord"> | string | null
    process?: StringNullableFilter<"RoastRecord"> | string | null
    variety?: StringNullableFilter<"RoastRecord"> | string | null
    roast_date?: DateTimeFilter<"RoastRecord"> | Date | string
    weight?: FloatNullableFilter<"RoastRecord"> | number | null
    charge_weight?: FloatNullableFilter<"RoastRecord"> | number | null
    temperature?: FloatNullableFilter<"RoastRecord"> | number | null
    humidity?: FloatNullableFilter<"RoastRecord"> | number | null
    pressure?: FloatNullableFilter<"RoastRecord"> | number | null
    altitude?: FloatNullableFilter<"RoastRecord"> | number | null
    charge_temp?: FloatNullableFilter<"RoastRecord"> | number | null
    moisture?: FloatNullableFilter<"RoastRecord"> | number | null
    after_weight?: FloatNullableFilter<"RoastRecord"> | number | null
    drop_temp?: FloatNullableFilter<"RoastRecord"> | number | null
    color?: FloatNullableFilter<"RoastRecord"> | number | null
    first_crack?: DateTimeNullableFilter<"RoastRecord"> | Date | string | null
    second_crack?: DateTimeNullableFilter<"RoastRecord"> | Date | string | null
    total_time?: FloatNullableFilter<"RoastRecord"> | number | null
    acidity?: FloatNullableFilter<"RoastRecord"> | number | null
    sweetness?: FloatNullableFilter<"RoastRecord"> | number | null
    bitterness?: FloatNullableFilter<"RoastRecord"> | number | null
    body?: FloatNullableFilter<"RoastRecord"> | number | null
    balance?: FloatNullableFilter<"RoastRecord"> | number | null
    nose_intensity?: FloatNullableFilter<"RoastRecord"> | number | null
    aroma_intensity?: FloatNullableFilter<"RoastRecord"> | number | null
    personal_score?: FloatNullableFilter<"RoastRecord"> | number | null
    overall_total_score?: FloatNullableFilter<"RoastRecord"> | number | null
    comments?: StringNullableFilter<"RoastRecord"> | string | null
    notes?: StringNullableFilter<"RoastRecord"> | string | null
    is_deleted?: BoolFilter<"RoastRecord"> | boolean
    user_id?: UuidNullableFilter<"RoastRecord"> | string | null
  }

  export type RoastRecordOrderByWithRelationInput = {
    id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    bean_name?: SortOrder
    origin?: SortOrderInput | SortOrder
    process?: SortOrderInput | SortOrder
    variety?: SortOrderInput | SortOrder
    roast_date?: SortOrder
    weight?: SortOrderInput | SortOrder
    charge_weight?: SortOrderInput | SortOrder
    temperature?: SortOrderInput | SortOrder
    humidity?: SortOrderInput | SortOrder
    pressure?: SortOrderInput | SortOrder
    altitude?: SortOrderInput | SortOrder
    charge_temp?: SortOrderInput | SortOrder
    moisture?: SortOrderInput | SortOrder
    after_weight?: SortOrderInput | SortOrder
    drop_temp?: SortOrderInput | SortOrder
    color?: SortOrderInput | SortOrder
    first_crack?: SortOrderInput | SortOrder
    second_crack?: SortOrderInput | SortOrder
    total_time?: SortOrderInput | SortOrder
    acidity?: SortOrderInput | SortOrder
    sweetness?: SortOrderInput | SortOrder
    bitterness?: SortOrderInput | SortOrder
    body?: SortOrderInput | SortOrder
    balance?: SortOrderInput | SortOrder
    nose_intensity?: SortOrderInput | SortOrder
    aroma_intensity?: SortOrderInput | SortOrder
    personal_score?: SortOrderInput | SortOrder
    overall_total_score?: SortOrderInput | SortOrder
    comments?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    is_deleted?: SortOrder
    user_id?: SortOrderInput | SortOrder
  }

  export type RoastRecordWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: RoastRecordWhereInput | RoastRecordWhereInput[]
    OR?: RoastRecordWhereInput[]
    NOT?: RoastRecordWhereInput | RoastRecordWhereInput[]
    created_at?: DateTimeFilter<"RoastRecord"> | Date | string
    updated_at?: DateTimeFilter<"RoastRecord"> | Date | string
    bean_name?: StringFilter<"RoastRecord"> | string
    origin?: StringNullableFilter<"RoastRecord"> | string | null
    process?: StringNullableFilter<"RoastRecord"> | string | null
    variety?: StringNullableFilter<"RoastRecord"> | string | null
    roast_date?: DateTimeFilter<"RoastRecord"> | Date | string
    weight?: FloatNullableFilter<"RoastRecord"> | number | null
    charge_weight?: FloatNullableFilter<"RoastRecord"> | number | null
    temperature?: FloatNullableFilter<"RoastRecord"> | number | null
    humidity?: FloatNullableFilter<"RoastRecord"> | number | null
    pressure?: FloatNullableFilter<"RoastRecord"> | number | null
    altitude?: FloatNullableFilter<"RoastRecord"> | number | null
    charge_temp?: FloatNullableFilter<"RoastRecord"> | number | null
    moisture?: FloatNullableFilter<"RoastRecord"> | number | null
    after_weight?: FloatNullableFilter<"RoastRecord"> | number | null
    drop_temp?: FloatNullableFilter<"RoastRecord"> | number | null
    color?: FloatNullableFilter<"RoastRecord"> | number | null
    first_crack?: DateTimeNullableFilter<"RoastRecord"> | Date | string | null
    second_crack?: DateTimeNullableFilter<"RoastRecord"> | Date | string | null
    total_time?: FloatNullableFilter<"RoastRecord"> | number | null
    acidity?: FloatNullableFilter<"RoastRecord"> | number | null
    sweetness?: FloatNullableFilter<"RoastRecord"> | number | null
    bitterness?: FloatNullableFilter<"RoastRecord"> | number | null
    body?: FloatNullableFilter<"RoastRecord"> | number | null
    balance?: FloatNullableFilter<"RoastRecord"> | number | null
    nose_intensity?: FloatNullableFilter<"RoastRecord"> | number | null
    aroma_intensity?: FloatNullableFilter<"RoastRecord"> | number | null
    personal_score?: FloatNullableFilter<"RoastRecord"> | number | null
    overall_total_score?: FloatNullableFilter<"RoastRecord"> | number | null
    comments?: StringNullableFilter<"RoastRecord"> | string | null
    notes?: StringNullableFilter<"RoastRecord"> | string | null
    is_deleted?: BoolFilter<"RoastRecord"> | boolean
    user_id?: UuidNullableFilter<"RoastRecord"> | string | null
  }, "id">

  export type RoastRecordOrderByWithAggregationInput = {
    id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    bean_name?: SortOrder
    origin?: SortOrderInput | SortOrder
    process?: SortOrderInput | SortOrder
    variety?: SortOrderInput | SortOrder
    roast_date?: SortOrder
    weight?: SortOrderInput | SortOrder
    charge_weight?: SortOrderInput | SortOrder
    temperature?: SortOrderInput | SortOrder
    humidity?: SortOrderInput | SortOrder
    pressure?: SortOrderInput | SortOrder
    altitude?: SortOrderInput | SortOrder
    charge_temp?: SortOrderInput | SortOrder
    moisture?: SortOrderInput | SortOrder
    after_weight?: SortOrderInput | SortOrder
    drop_temp?: SortOrderInput | SortOrder
    color?: SortOrderInput | SortOrder
    first_crack?: SortOrderInput | SortOrder
    second_crack?: SortOrderInput | SortOrder
    total_time?: SortOrderInput | SortOrder
    acidity?: SortOrderInput | SortOrder
    sweetness?: SortOrderInput | SortOrder
    bitterness?: SortOrderInput | SortOrder
    body?: SortOrderInput | SortOrder
    balance?: SortOrderInput | SortOrder
    nose_intensity?: SortOrderInput | SortOrder
    aroma_intensity?: SortOrderInput | SortOrder
    personal_score?: SortOrderInput | SortOrder
    overall_total_score?: SortOrderInput | SortOrder
    comments?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    is_deleted?: SortOrder
    user_id?: SortOrderInput | SortOrder
    _count?: RoastRecordCountOrderByAggregateInput
    _avg?: RoastRecordAvgOrderByAggregateInput
    _max?: RoastRecordMaxOrderByAggregateInput
    _min?: RoastRecordMinOrderByAggregateInput
    _sum?: RoastRecordSumOrderByAggregateInput
  }

  export type RoastRecordScalarWhereWithAggregatesInput = {
    AND?: RoastRecordScalarWhereWithAggregatesInput | RoastRecordScalarWhereWithAggregatesInput[]
    OR?: RoastRecordScalarWhereWithAggregatesInput[]
    NOT?: RoastRecordScalarWhereWithAggregatesInput | RoastRecordScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"RoastRecord"> | string
    created_at?: DateTimeWithAggregatesFilter<"RoastRecord"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"RoastRecord"> | Date | string
    bean_name?: StringWithAggregatesFilter<"RoastRecord"> | string
    origin?: StringNullableWithAggregatesFilter<"RoastRecord"> | string | null
    process?: StringNullableWithAggregatesFilter<"RoastRecord"> | string | null
    variety?: StringNullableWithAggregatesFilter<"RoastRecord"> | string | null
    roast_date?: DateTimeWithAggregatesFilter<"RoastRecord"> | Date | string
    weight?: FloatNullableWithAggregatesFilter<"RoastRecord"> | number | null
    charge_weight?: FloatNullableWithAggregatesFilter<"RoastRecord"> | number | null
    temperature?: FloatNullableWithAggregatesFilter<"RoastRecord"> | number | null
    humidity?: FloatNullableWithAggregatesFilter<"RoastRecord"> | number | null
    pressure?: FloatNullableWithAggregatesFilter<"RoastRecord"> | number | null
    altitude?: FloatNullableWithAggregatesFilter<"RoastRecord"> | number | null
    charge_temp?: FloatNullableWithAggregatesFilter<"RoastRecord"> | number | null
    moisture?: FloatNullableWithAggregatesFilter<"RoastRecord"> | number | null
    after_weight?: FloatNullableWithAggregatesFilter<"RoastRecord"> | number | null
    drop_temp?: FloatNullableWithAggregatesFilter<"RoastRecord"> | number | null
    color?: FloatNullableWithAggregatesFilter<"RoastRecord"> | number | null
    first_crack?: DateTimeNullableWithAggregatesFilter<"RoastRecord"> | Date | string | null
    second_crack?: DateTimeNullableWithAggregatesFilter<"RoastRecord"> | Date | string | null
    total_time?: FloatNullableWithAggregatesFilter<"RoastRecord"> | number | null
    acidity?: FloatNullableWithAggregatesFilter<"RoastRecord"> | number | null
    sweetness?: FloatNullableWithAggregatesFilter<"RoastRecord"> | number | null
    bitterness?: FloatNullableWithAggregatesFilter<"RoastRecord"> | number | null
    body?: FloatNullableWithAggregatesFilter<"RoastRecord"> | number | null
    balance?: FloatNullableWithAggregatesFilter<"RoastRecord"> | number | null
    nose_intensity?: FloatNullableWithAggregatesFilter<"RoastRecord"> | number | null
    aroma_intensity?: FloatNullableWithAggregatesFilter<"RoastRecord"> | number | null
    personal_score?: FloatNullableWithAggregatesFilter<"RoastRecord"> | number | null
    overall_total_score?: FloatNullableWithAggregatesFilter<"RoastRecord"> | number | null
    comments?: StringNullableWithAggregatesFilter<"RoastRecord"> | string | null
    notes?: StringNullableWithAggregatesFilter<"RoastRecord"> | string | null
    is_deleted?: BoolWithAggregatesFilter<"RoastRecord"> | boolean
    user_id?: UuidNullableWithAggregatesFilter<"RoastRecord"> | string | null
  }

  export type TastingRecordWhereInput = {
    AND?: TastingRecordWhereInput | TastingRecordWhereInput[]
    OR?: TastingRecordWhereInput[]
    NOT?: TastingRecordWhereInput | TastingRecordWhereInput[]
    id?: IntFilter<"TastingRecord"> | number
    coffee_name?: StringFilter<"TastingRecord"> | string
    score?: IntFilter<"TastingRecord"> | number
    notes?: StringNullableFilter<"TastingRecord"> | string | null
    altitude?: IntNullableFilter<"TastingRecord"> | number | null
    created_at?: DateTimeFilter<"TastingRecord"> | Date | string
    user_id?: UuidNullableFilter<"TastingRecord"> | string | null
  }

  export type TastingRecordOrderByWithRelationInput = {
    id?: SortOrder
    coffee_name?: SortOrder
    score?: SortOrder
    notes?: SortOrderInput | SortOrder
    altitude?: SortOrderInput | SortOrder
    created_at?: SortOrder
    user_id?: SortOrderInput | SortOrder
  }

  export type TastingRecordWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: TastingRecordWhereInput | TastingRecordWhereInput[]
    OR?: TastingRecordWhereInput[]
    NOT?: TastingRecordWhereInput | TastingRecordWhereInput[]
    coffee_name?: StringFilter<"TastingRecord"> | string
    score?: IntFilter<"TastingRecord"> | number
    notes?: StringNullableFilter<"TastingRecord"> | string | null
    altitude?: IntNullableFilter<"TastingRecord"> | number | null
    created_at?: DateTimeFilter<"TastingRecord"> | Date | string
    user_id?: UuidNullableFilter<"TastingRecord"> | string | null
  }, "id">

  export type TastingRecordOrderByWithAggregationInput = {
    id?: SortOrder
    coffee_name?: SortOrder
    score?: SortOrder
    notes?: SortOrderInput | SortOrder
    altitude?: SortOrderInput | SortOrder
    created_at?: SortOrder
    user_id?: SortOrderInput | SortOrder
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
    coffee_name?: StringWithAggregatesFilter<"TastingRecord"> | string
    score?: IntWithAggregatesFilter<"TastingRecord"> | number
    notes?: StringNullableWithAggregatesFilter<"TastingRecord"> | string | null
    altitude?: IntNullableWithAggregatesFilter<"TastingRecord"> | number | null
    created_at?: DateTimeWithAggregatesFilter<"TastingRecord"> | Date | string
    user_id?: UuidNullableWithAggregatesFilter<"TastingRecord"> | string | null
  }

  export type ShopVisitWhereInput = {
    AND?: ShopVisitWhereInput | ShopVisitWhereInput[]
    OR?: ShopVisitWhereInput[]
    NOT?: ShopVisitWhereInput | ShopVisitWhereInput[]
    id?: UuidFilter<"ShopVisit"> | string
    environment?: JsonFilter<"ShopVisit">
    shop?: JsonFilter<"ShopVisit">
    items?: JsonFilter<"ShopVisit">
    tasting?: JsonFilter<"ShopVisit">
    comments?: StringNullableFilter<"ShopVisit"> | string | null
    staff_info?: StringNullableFilter<"ShopVisit"> | string | null
    created_at?: DateTimeFilter<"ShopVisit"> | Date | string
    user_id?: UuidNullableFilter<"ShopVisit"> | string | null
  }

  export type ShopVisitOrderByWithRelationInput = {
    id?: SortOrder
    environment?: SortOrder
    shop?: SortOrder
    items?: SortOrder
    tasting?: SortOrder
    comments?: SortOrderInput | SortOrder
    staff_info?: SortOrderInput | SortOrder
    created_at?: SortOrder
    user_id?: SortOrderInput | SortOrder
  }

  export type ShopVisitWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ShopVisitWhereInput | ShopVisitWhereInput[]
    OR?: ShopVisitWhereInput[]
    NOT?: ShopVisitWhereInput | ShopVisitWhereInput[]
    environment?: JsonFilter<"ShopVisit">
    shop?: JsonFilter<"ShopVisit">
    items?: JsonFilter<"ShopVisit">
    tasting?: JsonFilter<"ShopVisit">
    comments?: StringNullableFilter<"ShopVisit"> | string | null
    staff_info?: StringNullableFilter<"ShopVisit"> | string | null
    created_at?: DateTimeFilter<"ShopVisit"> | Date | string
    user_id?: UuidNullableFilter<"ShopVisit"> | string | null
  }, "id">

  export type ShopVisitOrderByWithAggregationInput = {
    id?: SortOrder
    environment?: SortOrder
    shop?: SortOrder
    items?: SortOrder
    tasting?: SortOrder
    comments?: SortOrderInput | SortOrder
    staff_info?: SortOrderInput | SortOrder
    created_at?: SortOrder
    user_id?: SortOrderInput | SortOrder
    _count?: ShopVisitCountOrderByAggregateInput
    _max?: ShopVisitMaxOrderByAggregateInput
    _min?: ShopVisitMinOrderByAggregateInput
  }

  export type ShopVisitScalarWhereWithAggregatesInput = {
    AND?: ShopVisitScalarWhereWithAggregatesInput | ShopVisitScalarWhereWithAggregatesInput[]
    OR?: ShopVisitScalarWhereWithAggregatesInput[]
    NOT?: ShopVisitScalarWhereWithAggregatesInput | ShopVisitScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"ShopVisit"> | string
    environment?: JsonWithAggregatesFilter<"ShopVisit">
    shop?: JsonWithAggregatesFilter<"ShopVisit">
    items?: JsonWithAggregatesFilter<"ShopVisit">
    tasting?: JsonWithAggregatesFilter<"ShopVisit">
    comments?: StringNullableWithAggregatesFilter<"ShopVisit"> | string | null
    staff_info?: StringNullableWithAggregatesFilter<"ShopVisit"> | string | null
    created_at?: DateTimeWithAggregatesFilter<"ShopVisit"> | Date | string
    user_id?: UuidNullableWithAggregatesFilter<"ShopVisit"> | string | null
  }

  export type EspressoRecordWhereInput = {
    AND?: EspressoRecordWhereInput | EspressoRecordWhereInput[]
    OR?: EspressoRecordWhereInput[]
    NOT?: EspressoRecordWhereInput | EspressoRecordWhereInput[]
    id?: UuidFilter<"EspressoRecord"> | string
    created_at?: DateTimeFilter<"EspressoRecord"> | Date | string
    updated_at?: DateTimeFilter<"EspressoRecord"> | Date | string
    coffee?: JsonFilter<"EspressoRecord">
    environment?: JsonFilter<"EspressoRecord">
    brewing?: JsonFilter<"EspressoRecord">
    crema?: JsonFilter<"EspressoRecord">
    tasting?: JsonFilter<"EspressoRecord">
    nose?: JsonFilter<"EspressoRecord">
    aroma?: JsonFilter<"EspressoRecord">
    personal_score?: IntNullableFilter<"EspressoRecord"> | number | null
    comments?: StringNullableFilter<"EspressoRecord"> | string | null
    is_deleted?: BoolFilter<"EspressoRecord"> | boolean
    user_id?: UuidNullableFilter<"EspressoRecord"> | string | null
  }

  export type EspressoRecordOrderByWithRelationInput = {
    id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    coffee?: SortOrder
    environment?: SortOrder
    brewing?: SortOrder
    crema?: SortOrder
    tasting?: SortOrder
    nose?: SortOrder
    aroma?: SortOrder
    personal_score?: SortOrderInput | SortOrder
    comments?: SortOrderInput | SortOrder
    is_deleted?: SortOrder
    user_id?: SortOrderInput | SortOrder
  }

  export type EspressoRecordWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: EspressoRecordWhereInput | EspressoRecordWhereInput[]
    OR?: EspressoRecordWhereInput[]
    NOT?: EspressoRecordWhereInput | EspressoRecordWhereInput[]
    created_at?: DateTimeFilter<"EspressoRecord"> | Date | string
    updated_at?: DateTimeFilter<"EspressoRecord"> | Date | string
    coffee?: JsonFilter<"EspressoRecord">
    environment?: JsonFilter<"EspressoRecord">
    brewing?: JsonFilter<"EspressoRecord">
    crema?: JsonFilter<"EspressoRecord">
    tasting?: JsonFilter<"EspressoRecord">
    nose?: JsonFilter<"EspressoRecord">
    aroma?: JsonFilter<"EspressoRecord">
    personal_score?: IntNullableFilter<"EspressoRecord"> | number | null
    comments?: StringNullableFilter<"EspressoRecord"> | string | null
    is_deleted?: BoolFilter<"EspressoRecord"> | boolean
    user_id?: UuidNullableFilter<"EspressoRecord"> | string | null
  }, "id">

  export type EspressoRecordOrderByWithAggregationInput = {
    id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    coffee?: SortOrder
    environment?: SortOrder
    brewing?: SortOrder
    crema?: SortOrder
    tasting?: SortOrder
    nose?: SortOrder
    aroma?: SortOrder
    personal_score?: SortOrderInput | SortOrder
    comments?: SortOrderInput | SortOrder
    is_deleted?: SortOrder
    user_id?: SortOrderInput | SortOrder
    _count?: EspressoRecordCountOrderByAggregateInput
    _avg?: EspressoRecordAvgOrderByAggregateInput
    _max?: EspressoRecordMaxOrderByAggregateInput
    _min?: EspressoRecordMinOrderByAggregateInput
    _sum?: EspressoRecordSumOrderByAggregateInput
  }

  export type EspressoRecordScalarWhereWithAggregatesInput = {
    AND?: EspressoRecordScalarWhereWithAggregatesInput | EspressoRecordScalarWhereWithAggregatesInput[]
    OR?: EspressoRecordScalarWhereWithAggregatesInput[]
    NOT?: EspressoRecordScalarWhereWithAggregatesInput | EspressoRecordScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"EspressoRecord"> | string
    created_at?: DateTimeWithAggregatesFilter<"EspressoRecord"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"EspressoRecord"> | Date | string
    coffee?: JsonWithAggregatesFilter<"EspressoRecord">
    environment?: JsonWithAggregatesFilter<"EspressoRecord">
    brewing?: JsonWithAggregatesFilter<"EspressoRecord">
    crema?: JsonWithAggregatesFilter<"EspressoRecord">
    tasting?: JsonWithAggregatesFilter<"EspressoRecord">
    nose?: JsonWithAggregatesFilter<"EspressoRecord">
    aroma?: JsonWithAggregatesFilter<"EspressoRecord">
    personal_score?: IntNullableWithAggregatesFilter<"EspressoRecord"> | number | null
    comments?: StringNullableWithAggregatesFilter<"EspressoRecord"> | string | null
    is_deleted?: BoolWithAggregatesFilter<"EspressoRecord"> | boolean
    user_id?: UuidNullableWithAggregatesFilter<"EspressoRecord"> | string | null
  }

  export type RoastRecordCreateInput = {
    id?: string
    created_at?: Date | string
    updated_at?: Date | string
    bean_name: string
    origin?: string | null
    process?: string | null
    variety?: string | null
    roast_date: Date | string
    weight?: number | null
    charge_weight?: number | null
    temperature?: number | null
    humidity?: number | null
    pressure?: number | null
    altitude?: number | null
    charge_temp?: number | null
    moisture?: number | null
    after_weight?: number | null
    drop_temp?: number | null
    color?: number | null
    first_crack?: Date | string | null
    second_crack?: Date | string | null
    total_time?: number | null
    acidity?: number | null
    sweetness?: number | null
    bitterness?: number | null
    body?: number | null
    balance?: number | null
    nose_intensity?: number | null
    aroma_intensity?: number | null
    personal_score?: number | null
    overall_total_score?: number | null
    comments?: string | null
    notes?: string | null
    is_deleted?: boolean
    user_id?: string | null
  }

  export type RoastRecordUncheckedCreateInput = {
    id?: string
    created_at?: Date | string
    updated_at?: Date | string
    bean_name: string
    origin?: string | null
    process?: string | null
    variety?: string | null
    roast_date: Date | string
    weight?: number | null
    charge_weight?: number | null
    temperature?: number | null
    humidity?: number | null
    pressure?: number | null
    altitude?: number | null
    charge_temp?: number | null
    moisture?: number | null
    after_weight?: number | null
    drop_temp?: number | null
    color?: number | null
    first_crack?: Date | string | null
    second_crack?: Date | string | null
    total_time?: number | null
    acidity?: number | null
    sweetness?: number | null
    bitterness?: number | null
    body?: number | null
    balance?: number | null
    nose_intensity?: number | null
    aroma_intensity?: number | null
    personal_score?: number | null
    overall_total_score?: number | null
    comments?: string | null
    notes?: string | null
    is_deleted?: boolean
    user_id?: string | null
  }

  export type RoastRecordUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    bean_name?: StringFieldUpdateOperationsInput | string
    origin?: NullableStringFieldUpdateOperationsInput | string | null
    process?: NullableStringFieldUpdateOperationsInput | string | null
    variety?: NullableStringFieldUpdateOperationsInput | string | null
    roast_date?: DateTimeFieldUpdateOperationsInput | Date | string
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    charge_weight?: NullableFloatFieldUpdateOperationsInput | number | null
    temperature?: NullableFloatFieldUpdateOperationsInput | number | null
    humidity?: NullableFloatFieldUpdateOperationsInput | number | null
    pressure?: NullableFloatFieldUpdateOperationsInput | number | null
    altitude?: NullableFloatFieldUpdateOperationsInput | number | null
    charge_temp?: NullableFloatFieldUpdateOperationsInput | number | null
    moisture?: NullableFloatFieldUpdateOperationsInput | number | null
    after_weight?: NullableFloatFieldUpdateOperationsInput | number | null
    drop_temp?: NullableFloatFieldUpdateOperationsInput | number | null
    color?: NullableFloatFieldUpdateOperationsInput | number | null
    first_crack?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    second_crack?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    total_time?: NullableFloatFieldUpdateOperationsInput | number | null
    acidity?: NullableFloatFieldUpdateOperationsInput | number | null
    sweetness?: NullableFloatFieldUpdateOperationsInput | number | null
    bitterness?: NullableFloatFieldUpdateOperationsInput | number | null
    body?: NullableFloatFieldUpdateOperationsInput | number | null
    balance?: NullableFloatFieldUpdateOperationsInput | number | null
    nose_intensity?: NullableFloatFieldUpdateOperationsInput | number | null
    aroma_intensity?: NullableFloatFieldUpdateOperationsInput | number | null
    personal_score?: NullableFloatFieldUpdateOperationsInput | number | null
    overall_total_score?: NullableFloatFieldUpdateOperationsInput | number | null
    comments?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
    user_id?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type RoastRecordUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    bean_name?: StringFieldUpdateOperationsInput | string
    origin?: NullableStringFieldUpdateOperationsInput | string | null
    process?: NullableStringFieldUpdateOperationsInput | string | null
    variety?: NullableStringFieldUpdateOperationsInput | string | null
    roast_date?: DateTimeFieldUpdateOperationsInput | Date | string
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    charge_weight?: NullableFloatFieldUpdateOperationsInput | number | null
    temperature?: NullableFloatFieldUpdateOperationsInput | number | null
    humidity?: NullableFloatFieldUpdateOperationsInput | number | null
    pressure?: NullableFloatFieldUpdateOperationsInput | number | null
    altitude?: NullableFloatFieldUpdateOperationsInput | number | null
    charge_temp?: NullableFloatFieldUpdateOperationsInput | number | null
    moisture?: NullableFloatFieldUpdateOperationsInput | number | null
    after_weight?: NullableFloatFieldUpdateOperationsInput | number | null
    drop_temp?: NullableFloatFieldUpdateOperationsInput | number | null
    color?: NullableFloatFieldUpdateOperationsInput | number | null
    first_crack?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    second_crack?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    total_time?: NullableFloatFieldUpdateOperationsInput | number | null
    acidity?: NullableFloatFieldUpdateOperationsInput | number | null
    sweetness?: NullableFloatFieldUpdateOperationsInput | number | null
    bitterness?: NullableFloatFieldUpdateOperationsInput | number | null
    body?: NullableFloatFieldUpdateOperationsInput | number | null
    balance?: NullableFloatFieldUpdateOperationsInput | number | null
    nose_intensity?: NullableFloatFieldUpdateOperationsInput | number | null
    aroma_intensity?: NullableFloatFieldUpdateOperationsInput | number | null
    personal_score?: NullableFloatFieldUpdateOperationsInput | number | null
    overall_total_score?: NullableFloatFieldUpdateOperationsInput | number | null
    comments?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
    user_id?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type RoastRecordCreateManyInput = {
    id?: string
    created_at?: Date | string
    updated_at?: Date | string
    bean_name: string
    origin?: string | null
    process?: string | null
    variety?: string | null
    roast_date: Date | string
    weight?: number | null
    charge_weight?: number | null
    temperature?: number | null
    humidity?: number | null
    pressure?: number | null
    altitude?: number | null
    charge_temp?: number | null
    moisture?: number | null
    after_weight?: number | null
    drop_temp?: number | null
    color?: number | null
    first_crack?: Date | string | null
    second_crack?: Date | string | null
    total_time?: number | null
    acidity?: number | null
    sweetness?: number | null
    bitterness?: number | null
    body?: number | null
    balance?: number | null
    nose_intensity?: number | null
    aroma_intensity?: number | null
    personal_score?: number | null
    overall_total_score?: number | null
    comments?: string | null
    notes?: string | null
    is_deleted?: boolean
    user_id?: string | null
  }

  export type RoastRecordUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    bean_name?: StringFieldUpdateOperationsInput | string
    origin?: NullableStringFieldUpdateOperationsInput | string | null
    process?: NullableStringFieldUpdateOperationsInput | string | null
    variety?: NullableStringFieldUpdateOperationsInput | string | null
    roast_date?: DateTimeFieldUpdateOperationsInput | Date | string
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    charge_weight?: NullableFloatFieldUpdateOperationsInput | number | null
    temperature?: NullableFloatFieldUpdateOperationsInput | number | null
    humidity?: NullableFloatFieldUpdateOperationsInput | number | null
    pressure?: NullableFloatFieldUpdateOperationsInput | number | null
    altitude?: NullableFloatFieldUpdateOperationsInput | number | null
    charge_temp?: NullableFloatFieldUpdateOperationsInput | number | null
    moisture?: NullableFloatFieldUpdateOperationsInput | number | null
    after_weight?: NullableFloatFieldUpdateOperationsInput | number | null
    drop_temp?: NullableFloatFieldUpdateOperationsInput | number | null
    color?: NullableFloatFieldUpdateOperationsInput | number | null
    first_crack?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    second_crack?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    total_time?: NullableFloatFieldUpdateOperationsInput | number | null
    acidity?: NullableFloatFieldUpdateOperationsInput | number | null
    sweetness?: NullableFloatFieldUpdateOperationsInput | number | null
    bitterness?: NullableFloatFieldUpdateOperationsInput | number | null
    body?: NullableFloatFieldUpdateOperationsInput | number | null
    balance?: NullableFloatFieldUpdateOperationsInput | number | null
    nose_intensity?: NullableFloatFieldUpdateOperationsInput | number | null
    aroma_intensity?: NullableFloatFieldUpdateOperationsInput | number | null
    personal_score?: NullableFloatFieldUpdateOperationsInput | number | null
    overall_total_score?: NullableFloatFieldUpdateOperationsInput | number | null
    comments?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
    user_id?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type RoastRecordUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    bean_name?: StringFieldUpdateOperationsInput | string
    origin?: NullableStringFieldUpdateOperationsInput | string | null
    process?: NullableStringFieldUpdateOperationsInput | string | null
    variety?: NullableStringFieldUpdateOperationsInput | string | null
    roast_date?: DateTimeFieldUpdateOperationsInput | Date | string
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    charge_weight?: NullableFloatFieldUpdateOperationsInput | number | null
    temperature?: NullableFloatFieldUpdateOperationsInput | number | null
    humidity?: NullableFloatFieldUpdateOperationsInput | number | null
    pressure?: NullableFloatFieldUpdateOperationsInput | number | null
    altitude?: NullableFloatFieldUpdateOperationsInput | number | null
    charge_temp?: NullableFloatFieldUpdateOperationsInput | number | null
    moisture?: NullableFloatFieldUpdateOperationsInput | number | null
    after_weight?: NullableFloatFieldUpdateOperationsInput | number | null
    drop_temp?: NullableFloatFieldUpdateOperationsInput | number | null
    color?: NullableFloatFieldUpdateOperationsInput | number | null
    first_crack?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    second_crack?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    total_time?: NullableFloatFieldUpdateOperationsInput | number | null
    acidity?: NullableFloatFieldUpdateOperationsInput | number | null
    sweetness?: NullableFloatFieldUpdateOperationsInput | number | null
    bitterness?: NullableFloatFieldUpdateOperationsInput | number | null
    body?: NullableFloatFieldUpdateOperationsInput | number | null
    balance?: NullableFloatFieldUpdateOperationsInput | number | null
    nose_intensity?: NullableFloatFieldUpdateOperationsInput | number | null
    aroma_intensity?: NullableFloatFieldUpdateOperationsInput | number | null
    personal_score?: NullableFloatFieldUpdateOperationsInput | number | null
    overall_total_score?: NullableFloatFieldUpdateOperationsInput | number | null
    comments?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
    user_id?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TastingRecordCreateInput = {
    coffee_name: string
    score: number
    notes?: string | null
    altitude?: number | null
    created_at?: Date | string
    user_id?: string | null
  }

  export type TastingRecordUncheckedCreateInput = {
    id?: number
    coffee_name: string
    score: number
    notes?: string | null
    altitude?: number | null
    created_at?: Date | string
    user_id?: string | null
  }

  export type TastingRecordUpdateInput = {
    coffee_name?: StringFieldUpdateOperationsInput | string
    score?: IntFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    altitude?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user_id?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TastingRecordUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    coffee_name?: StringFieldUpdateOperationsInput | string
    score?: IntFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    altitude?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user_id?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TastingRecordCreateManyInput = {
    id?: number
    coffee_name: string
    score: number
    notes?: string | null
    altitude?: number | null
    created_at?: Date | string
    user_id?: string | null
  }

  export type TastingRecordUpdateManyMutationInput = {
    coffee_name?: StringFieldUpdateOperationsInput | string
    score?: IntFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    altitude?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user_id?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TastingRecordUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    coffee_name?: StringFieldUpdateOperationsInput | string
    score?: IntFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    altitude?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user_id?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ShopVisitCreateInput = {
    id?: string
    environment: JsonNullValueInput | InputJsonValue
    shop: JsonNullValueInput | InputJsonValue
    items: JsonNullValueInput | InputJsonValue
    tasting: JsonNullValueInput | InputJsonValue
    comments?: string | null
    staff_info?: string | null
    created_at?: Date | string
    user_id?: string | null
  }

  export type ShopVisitUncheckedCreateInput = {
    id?: string
    environment: JsonNullValueInput | InputJsonValue
    shop: JsonNullValueInput | InputJsonValue
    items: JsonNullValueInput | InputJsonValue
    tasting: JsonNullValueInput | InputJsonValue
    comments?: string | null
    staff_info?: string | null
    created_at?: Date | string
    user_id?: string | null
  }

  export type ShopVisitUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    environment?: JsonNullValueInput | InputJsonValue
    shop?: JsonNullValueInput | InputJsonValue
    items?: JsonNullValueInput | InputJsonValue
    tasting?: JsonNullValueInput | InputJsonValue
    comments?: NullableStringFieldUpdateOperationsInput | string | null
    staff_info?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user_id?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ShopVisitUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    environment?: JsonNullValueInput | InputJsonValue
    shop?: JsonNullValueInput | InputJsonValue
    items?: JsonNullValueInput | InputJsonValue
    tasting?: JsonNullValueInput | InputJsonValue
    comments?: NullableStringFieldUpdateOperationsInput | string | null
    staff_info?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user_id?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ShopVisitCreateManyInput = {
    id?: string
    environment: JsonNullValueInput | InputJsonValue
    shop: JsonNullValueInput | InputJsonValue
    items: JsonNullValueInput | InputJsonValue
    tasting: JsonNullValueInput | InputJsonValue
    comments?: string | null
    staff_info?: string | null
    created_at?: Date | string
    user_id?: string | null
  }

  export type ShopVisitUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    environment?: JsonNullValueInput | InputJsonValue
    shop?: JsonNullValueInput | InputJsonValue
    items?: JsonNullValueInput | InputJsonValue
    tasting?: JsonNullValueInput | InputJsonValue
    comments?: NullableStringFieldUpdateOperationsInput | string | null
    staff_info?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user_id?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ShopVisitUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    environment?: JsonNullValueInput | InputJsonValue
    shop?: JsonNullValueInput | InputJsonValue
    items?: JsonNullValueInput | InputJsonValue
    tasting?: JsonNullValueInput | InputJsonValue
    comments?: NullableStringFieldUpdateOperationsInput | string | null
    staff_info?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user_id?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type EspressoRecordCreateInput = {
    id?: string
    created_at?: Date | string
    updated_at?: Date | string
    coffee: JsonNullValueInput | InputJsonValue
    environment: JsonNullValueInput | InputJsonValue
    brewing: JsonNullValueInput | InputJsonValue
    crema: JsonNullValueInput | InputJsonValue
    tasting: JsonNullValueInput | InputJsonValue
    nose: JsonNullValueInput | InputJsonValue
    aroma: JsonNullValueInput | InputJsonValue
    personal_score?: number | null
    comments?: string | null
    is_deleted?: boolean
    user_id?: string | null
  }

  export type EspressoRecordUncheckedCreateInput = {
    id?: string
    created_at?: Date | string
    updated_at?: Date | string
    coffee: JsonNullValueInput | InputJsonValue
    environment: JsonNullValueInput | InputJsonValue
    brewing: JsonNullValueInput | InputJsonValue
    crema: JsonNullValueInput | InputJsonValue
    tasting: JsonNullValueInput | InputJsonValue
    nose: JsonNullValueInput | InputJsonValue
    aroma: JsonNullValueInput | InputJsonValue
    personal_score?: number | null
    comments?: string | null
    is_deleted?: boolean
    user_id?: string | null
  }

  export type EspressoRecordUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    coffee?: JsonNullValueInput | InputJsonValue
    environment?: JsonNullValueInput | InputJsonValue
    brewing?: JsonNullValueInput | InputJsonValue
    crema?: JsonNullValueInput | InputJsonValue
    tasting?: JsonNullValueInput | InputJsonValue
    nose?: JsonNullValueInput | InputJsonValue
    aroma?: JsonNullValueInput | InputJsonValue
    personal_score?: NullableIntFieldUpdateOperationsInput | number | null
    comments?: NullableStringFieldUpdateOperationsInput | string | null
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
    user_id?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type EspressoRecordUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    coffee?: JsonNullValueInput | InputJsonValue
    environment?: JsonNullValueInput | InputJsonValue
    brewing?: JsonNullValueInput | InputJsonValue
    crema?: JsonNullValueInput | InputJsonValue
    tasting?: JsonNullValueInput | InputJsonValue
    nose?: JsonNullValueInput | InputJsonValue
    aroma?: JsonNullValueInput | InputJsonValue
    personal_score?: NullableIntFieldUpdateOperationsInput | number | null
    comments?: NullableStringFieldUpdateOperationsInput | string | null
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
    user_id?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type EspressoRecordCreateManyInput = {
    id?: string
    created_at?: Date | string
    updated_at?: Date | string
    coffee: JsonNullValueInput | InputJsonValue
    environment: JsonNullValueInput | InputJsonValue
    brewing: JsonNullValueInput | InputJsonValue
    crema: JsonNullValueInput | InputJsonValue
    tasting: JsonNullValueInput | InputJsonValue
    nose: JsonNullValueInput | InputJsonValue
    aroma: JsonNullValueInput | InputJsonValue
    personal_score?: number | null
    comments?: string | null
    is_deleted?: boolean
    user_id?: string | null
  }

  export type EspressoRecordUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    coffee?: JsonNullValueInput | InputJsonValue
    environment?: JsonNullValueInput | InputJsonValue
    brewing?: JsonNullValueInput | InputJsonValue
    crema?: JsonNullValueInput | InputJsonValue
    tasting?: JsonNullValueInput | InputJsonValue
    nose?: JsonNullValueInput | InputJsonValue
    aroma?: JsonNullValueInput | InputJsonValue
    personal_score?: NullableIntFieldUpdateOperationsInput | number | null
    comments?: NullableStringFieldUpdateOperationsInput | string | null
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
    user_id?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type EspressoRecordUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    coffee?: JsonNullValueInput | InputJsonValue
    environment?: JsonNullValueInput | InputJsonValue
    brewing?: JsonNullValueInput | InputJsonValue
    crema?: JsonNullValueInput | InputJsonValue
    tasting?: JsonNullValueInput | InputJsonValue
    nose?: JsonNullValueInput | InputJsonValue
    aroma?: JsonNullValueInput | InputJsonValue
    personal_score?: NullableIntFieldUpdateOperationsInput | number | null
    comments?: NullableStringFieldUpdateOperationsInput | string | null
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
    user_id?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidFilter<$PrismaModel> | string
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

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type UuidNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidNullableFilter<$PrismaModel> | string | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type RoastRecordCountOrderByAggregateInput = {
    id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    bean_name?: SortOrder
    origin?: SortOrder
    process?: SortOrder
    variety?: SortOrder
    roast_date?: SortOrder
    weight?: SortOrder
    charge_weight?: SortOrder
    temperature?: SortOrder
    humidity?: SortOrder
    pressure?: SortOrder
    altitude?: SortOrder
    charge_temp?: SortOrder
    moisture?: SortOrder
    after_weight?: SortOrder
    drop_temp?: SortOrder
    color?: SortOrder
    first_crack?: SortOrder
    second_crack?: SortOrder
    total_time?: SortOrder
    acidity?: SortOrder
    sweetness?: SortOrder
    bitterness?: SortOrder
    body?: SortOrder
    balance?: SortOrder
    nose_intensity?: SortOrder
    aroma_intensity?: SortOrder
    personal_score?: SortOrder
    overall_total_score?: SortOrder
    comments?: SortOrder
    notes?: SortOrder
    is_deleted?: SortOrder
    user_id?: SortOrder
  }

  export type RoastRecordAvgOrderByAggregateInput = {
    weight?: SortOrder
    charge_weight?: SortOrder
    temperature?: SortOrder
    humidity?: SortOrder
    pressure?: SortOrder
    altitude?: SortOrder
    charge_temp?: SortOrder
    moisture?: SortOrder
    after_weight?: SortOrder
    drop_temp?: SortOrder
    color?: SortOrder
    total_time?: SortOrder
    acidity?: SortOrder
    sweetness?: SortOrder
    bitterness?: SortOrder
    body?: SortOrder
    balance?: SortOrder
    nose_intensity?: SortOrder
    aroma_intensity?: SortOrder
    personal_score?: SortOrder
    overall_total_score?: SortOrder
  }

  export type RoastRecordMaxOrderByAggregateInput = {
    id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    bean_name?: SortOrder
    origin?: SortOrder
    process?: SortOrder
    variety?: SortOrder
    roast_date?: SortOrder
    weight?: SortOrder
    charge_weight?: SortOrder
    temperature?: SortOrder
    humidity?: SortOrder
    pressure?: SortOrder
    altitude?: SortOrder
    charge_temp?: SortOrder
    moisture?: SortOrder
    after_weight?: SortOrder
    drop_temp?: SortOrder
    color?: SortOrder
    first_crack?: SortOrder
    second_crack?: SortOrder
    total_time?: SortOrder
    acidity?: SortOrder
    sweetness?: SortOrder
    bitterness?: SortOrder
    body?: SortOrder
    balance?: SortOrder
    nose_intensity?: SortOrder
    aroma_intensity?: SortOrder
    personal_score?: SortOrder
    overall_total_score?: SortOrder
    comments?: SortOrder
    notes?: SortOrder
    is_deleted?: SortOrder
    user_id?: SortOrder
  }

  export type RoastRecordMinOrderByAggregateInput = {
    id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    bean_name?: SortOrder
    origin?: SortOrder
    process?: SortOrder
    variety?: SortOrder
    roast_date?: SortOrder
    weight?: SortOrder
    charge_weight?: SortOrder
    temperature?: SortOrder
    humidity?: SortOrder
    pressure?: SortOrder
    altitude?: SortOrder
    charge_temp?: SortOrder
    moisture?: SortOrder
    after_weight?: SortOrder
    drop_temp?: SortOrder
    color?: SortOrder
    first_crack?: SortOrder
    second_crack?: SortOrder
    total_time?: SortOrder
    acidity?: SortOrder
    sweetness?: SortOrder
    bitterness?: SortOrder
    body?: SortOrder
    balance?: SortOrder
    nose_intensity?: SortOrder
    aroma_intensity?: SortOrder
    personal_score?: SortOrder
    overall_total_score?: SortOrder
    comments?: SortOrder
    notes?: SortOrder
    is_deleted?: SortOrder
    user_id?: SortOrder
  }

  export type RoastRecordSumOrderByAggregateInput = {
    weight?: SortOrder
    charge_weight?: SortOrder
    temperature?: SortOrder
    humidity?: SortOrder
    pressure?: SortOrder
    altitude?: SortOrder
    charge_temp?: SortOrder
    moisture?: SortOrder
    after_weight?: SortOrder
    drop_temp?: SortOrder
    color?: SortOrder
    total_time?: SortOrder
    acidity?: SortOrder
    sweetness?: SortOrder
    bitterness?: SortOrder
    body?: SortOrder
    balance?: SortOrder
    nose_intensity?: SortOrder
    aroma_intensity?: SortOrder
    personal_score?: SortOrder
    overall_total_score?: SortOrder
  }

  export type UuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
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

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type UuidNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
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

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type TastingRecordCountOrderByAggregateInput = {
    id?: SortOrder
    coffee_name?: SortOrder
    score?: SortOrder
    notes?: SortOrder
    altitude?: SortOrder
    created_at?: SortOrder
    user_id?: SortOrder
  }

  export type TastingRecordAvgOrderByAggregateInput = {
    id?: SortOrder
    score?: SortOrder
    altitude?: SortOrder
  }

  export type TastingRecordMaxOrderByAggregateInput = {
    id?: SortOrder
    coffee_name?: SortOrder
    score?: SortOrder
    notes?: SortOrder
    altitude?: SortOrder
    created_at?: SortOrder
    user_id?: SortOrder
  }

  export type TastingRecordMinOrderByAggregateInput = {
    id?: SortOrder
    coffee_name?: SortOrder
    score?: SortOrder
    notes?: SortOrder
    altitude?: SortOrder
    created_at?: SortOrder
    user_id?: SortOrder
  }

  export type TastingRecordSumOrderByAggregateInput = {
    id?: SortOrder
    score?: SortOrder
    altitude?: SortOrder
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

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type ShopVisitCountOrderByAggregateInput = {
    id?: SortOrder
    environment?: SortOrder
    shop?: SortOrder
    items?: SortOrder
    tasting?: SortOrder
    comments?: SortOrder
    staff_info?: SortOrder
    created_at?: SortOrder
    user_id?: SortOrder
  }

  export type ShopVisitMaxOrderByAggregateInput = {
    id?: SortOrder
    comments?: SortOrder
    staff_info?: SortOrder
    created_at?: SortOrder
    user_id?: SortOrder
  }

  export type ShopVisitMinOrderByAggregateInput = {
    id?: SortOrder
    comments?: SortOrder
    staff_info?: SortOrder
    created_at?: SortOrder
    user_id?: SortOrder
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type EspressoRecordCountOrderByAggregateInput = {
    id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    coffee?: SortOrder
    environment?: SortOrder
    brewing?: SortOrder
    crema?: SortOrder
    tasting?: SortOrder
    nose?: SortOrder
    aroma?: SortOrder
    personal_score?: SortOrder
    comments?: SortOrder
    is_deleted?: SortOrder
    user_id?: SortOrder
  }

  export type EspressoRecordAvgOrderByAggregateInput = {
    personal_score?: SortOrder
  }

  export type EspressoRecordMaxOrderByAggregateInput = {
    id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    personal_score?: SortOrder
    comments?: SortOrder
    is_deleted?: SortOrder
    user_id?: SortOrder
  }

  export type EspressoRecordMinOrderByAggregateInput = {
    id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    personal_score?: SortOrder
    comments?: SortOrder
    is_deleted?: SortOrder
    user_id?: SortOrder
  }

  export type EspressoRecordSumOrderByAggregateInput = {
    personal_score?: SortOrder
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NestedUuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidFilter<$PrismaModel> | string
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

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedUuidNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidNullableFilter<$PrismaModel> | string | null
  }

  export type NestedUuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
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

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedUuidNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
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

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
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