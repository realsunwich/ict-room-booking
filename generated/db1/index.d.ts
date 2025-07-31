
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
 * Model BookingInfo
 * 
 */
export type BookingInfo = $Result.DefaultSelection<Prisma.$BookingInfoPayload>
/**
 * Model RoomUsageStats
 * 
 */
export type RoomUsageStats = $Result.DefaultSelection<Prisma.$RoomUsageStatsPayload>
/**
 * Model Signature
 * 
 */
export type Signature = $Result.DefaultSelection<Prisma.$SignaturePayload>
/**
 * Model Assessment
 * 
 */
export type Assessment = $Result.DefaultSelection<Prisma.$AssessmentPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more BookingInfos
 * const bookingInfos = await prisma.bookingInfo.findMany()
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
   * // Fetch zero or more BookingInfos
   * const bookingInfos = await prisma.bookingInfo.findMany()
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
   * `prisma.bookingInfo`: Exposes CRUD operations for the **BookingInfo** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more BookingInfos
    * const bookingInfos = await prisma.bookingInfo.findMany()
    * ```
    */
  get bookingInfo(): Prisma.BookingInfoDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.roomUsageStats`: Exposes CRUD operations for the **RoomUsageStats** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RoomUsageStats
    * const roomUsageStats = await prisma.roomUsageStats.findMany()
    * ```
    */
  get roomUsageStats(): Prisma.RoomUsageStatsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.signature`: Exposes CRUD operations for the **Signature** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Signatures
    * const signatures = await prisma.signature.findMany()
    * ```
    */
  get signature(): Prisma.SignatureDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.assessment`: Exposes CRUD operations for the **Assessment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Assessments
    * const assessments = await prisma.assessment.findMany()
    * ```
    */
  get assessment(): Prisma.AssessmentDelegate<ExtArgs, ClientOptions>;
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
   * Prisma Client JS version: 6.10.1
   * Query Engine version: 9b628578b3b7cae625e8c927178f15a170e74a9c
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
    BookingInfo: 'BookingInfo',
    RoomUsageStats: 'RoomUsageStats',
    Signature: 'Signature',
    Assessment: 'Assessment'
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
      modelProps: "bookingInfo" | "roomUsageStats" | "signature" | "assessment"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      BookingInfo: {
        payload: Prisma.$BookingInfoPayload<ExtArgs>
        fields: Prisma.BookingInfoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BookingInfoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingInfoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BookingInfoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingInfoPayload>
          }
          findFirst: {
            args: Prisma.BookingInfoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingInfoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BookingInfoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingInfoPayload>
          }
          findMany: {
            args: Prisma.BookingInfoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingInfoPayload>[]
          }
          create: {
            args: Prisma.BookingInfoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingInfoPayload>
          }
          createMany: {
            args: Prisma.BookingInfoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.BookingInfoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingInfoPayload>
          }
          update: {
            args: Prisma.BookingInfoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingInfoPayload>
          }
          deleteMany: {
            args: Prisma.BookingInfoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BookingInfoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.BookingInfoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingInfoPayload>
          }
          aggregate: {
            args: Prisma.BookingInfoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBookingInfo>
          }
          groupBy: {
            args: Prisma.BookingInfoGroupByArgs<ExtArgs>
            result: $Utils.Optional<BookingInfoGroupByOutputType>[]
          }
          count: {
            args: Prisma.BookingInfoCountArgs<ExtArgs>
            result: $Utils.Optional<BookingInfoCountAggregateOutputType> | number
          }
        }
      }
      RoomUsageStats: {
        payload: Prisma.$RoomUsageStatsPayload<ExtArgs>
        fields: Prisma.RoomUsageStatsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RoomUsageStatsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomUsageStatsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RoomUsageStatsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomUsageStatsPayload>
          }
          findFirst: {
            args: Prisma.RoomUsageStatsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomUsageStatsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RoomUsageStatsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomUsageStatsPayload>
          }
          findMany: {
            args: Prisma.RoomUsageStatsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomUsageStatsPayload>[]
          }
          create: {
            args: Prisma.RoomUsageStatsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomUsageStatsPayload>
          }
          createMany: {
            args: Prisma.RoomUsageStatsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.RoomUsageStatsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomUsageStatsPayload>
          }
          update: {
            args: Prisma.RoomUsageStatsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomUsageStatsPayload>
          }
          deleteMany: {
            args: Prisma.RoomUsageStatsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RoomUsageStatsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.RoomUsageStatsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomUsageStatsPayload>
          }
          aggregate: {
            args: Prisma.RoomUsageStatsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRoomUsageStats>
          }
          groupBy: {
            args: Prisma.RoomUsageStatsGroupByArgs<ExtArgs>
            result: $Utils.Optional<RoomUsageStatsGroupByOutputType>[]
          }
          count: {
            args: Prisma.RoomUsageStatsCountArgs<ExtArgs>
            result: $Utils.Optional<RoomUsageStatsCountAggregateOutputType> | number
          }
        }
      }
      Signature: {
        payload: Prisma.$SignaturePayload<ExtArgs>
        fields: Prisma.SignatureFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SignatureFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SignaturePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SignatureFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SignaturePayload>
          }
          findFirst: {
            args: Prisma.SignatureFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SignaturePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SignatureFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SignaturePayload>
          }
          findMany: {
            args: Prisma.SignatureFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SignaturePayload>[]
          }
          create: {
            args: Prisma.SignatureCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SignaturePayload>
          }
          createMany: {
            args: Prisma.SignatureCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.SignatureDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SignaturePayload>
          }
          update: {
            args: Prisma.SignatureUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SignaturePayload>
          }
          deleteMany: {
            args: Prisma.SignatureDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SignatureUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.SignatureUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SignaturePayload>
          }
          aggregate: {
            args: Prisma.SignatureAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSignature>
          }
          groupBy: {
            args: Prisma.SignatureGroupByArgs<ExtArgs>
            result: $Utils.Optional<SignatureGroupByOutputType>[]
          }
          count: {
            args: Prisma.SignatureCountArgs<ExtArgs>
            result: $Utils.Optional<SignatureCountAggregateOutputType> | number
          }
        }
      }
      Assessment: {
        payload: Prisma.$AssessmentPayload<ExtArgs>
        fields: Prisma.AssessmentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AssessmentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssessmentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AssessmentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssessmentPayload>
          }
          findFirst: {
            args: Prisma.AssessmentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssessmentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AssessmentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssessmentPayload>
          }
          findMany: {
            args: Prisma.AssessmentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssessmentPayload>[]
          }
          create: {
            args: Prisma.AssessmentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssessmentPayload>
          }
          createMany: {
            args: Prisma.AssessmentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.AssessmentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssessmentPayload>
          }
          update: {
            args: Prisma.AssessmentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssessmentPayload>
          }
          deleteMany: {
            args: Prisma.AssessmentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AssessmentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AssessmentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssessmentPayload>
          }
          aggregate: {
            args: Prisma.AssessmentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAssessment>
          }
          groupBy: {
            args: Prisma.AssessmentGroupByArgs<ExtArgs>
            result: $Utils.Optional<AssessmentGroupByOutputType>[]
          }
          count: {
            args: Prisma.AssessmentCountArgs<ExtArgs>
            result: $Utils.Optional<AssessmentCountAggregateOutputType> | number
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
    bookingInfo?: BookingInfoOmit
    roomUsageStats?: RoomUsageStatsOmit
    signature?: SignatureOmit
    assessment?: AssessmentOmit
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
   * Model BookingInfo
   */

  export type AggregateBookingInfo = {
    _count: BookingInfoCountAggregateOutputType | null
    _avg: BookingInfoAvgAggregateOutputType | null
    _sum: BookingInfoSumAggregateOutputType | null
    _min: BookingInfoMinAggregateOutputType | null
    _max: BookingInfoMaxAggregateOutputType | null
  }

  export type BookingInfoAvgAggregateOutputType = {
    bookingID: number | null
    capacity: number | null
  }

  export type BookingInfoSumAggregateOutputType = {
    bookingID: number | null
    capacity: number | null
  }

  export type BookingInfoMinAggregateOutputType = {
    bookingID: number | null
    RoomName: string | null
    sendDate: Date | null
    sender: string | null
    senderEmail: string | null
    phoneIn: string | null
    phoneOut: string | null
    jobName: string | null
    officeLocation: string | null
    purpose: string | null
    startDate: Date | null
    endDate: Date | null
    capacity: number | null
    cfSender: string | null
    cfPhone: string | null
    SendStatus: string | null
    approvedNumber: string | null
    RejectReason: string | null
    CancelReason: string | null
    clearStatus: string | null
    damageAction: string | null
    remark: string | null
    createdAt: Date | null
    updatedAt: Date | null
    RecordStatus: string | null
    calendarEventId: string | null
  }

  export type BookingInfoMaxAggregateOutputType = {
    bookingID: number | null
    RoomName: string | null
    sendDate: Date | null
    sender: string | null
    senderEmail: string | null
    phoneIn: string | null
    phoneOut: string | null
    jobName: string | null
    officeLocation: string | null
    purpose: string | null
    startDate: Date | null
    endDate: Date | null
    capacity: number | null
    cfSender: string | null
    cfPhone: string | null
    SendStatus: string | null
    approvedNumber: string | null
    RejectReason: string | null
    CancelReason: string | null
    clearStatus: string | null
    damageAction: string | null
    remark: string | null
    createdAt: Date | null
    updatedAt: Date | null
    RecordStatus: string | null
    calendarEventId: string | null
  }

  export type BookingInfoCountAggregateOutputType = {
    bookingID: number
    RoomName: number
    sendDate: number
    sender: number
    senderEmail: number
    phoneIn: number
    phoneOut: number
    jobName: number
    officeLocation: number
    purpose: number
    startDate: number
    endDate: number
    capacity: number
    cfSender: number
    cfPhone: number
    SendStatus: number
    approvedNumber: number
    RejectReason: number
    CancelReason: number
    clearStatus: number
    damageAction: number
    remark: number
    createdAt: number
    updatedAt: number
    RecordStatus: number
    calendarEventId: number
    _all: number
  }


  export type BookingInfoAvgAggregateInputType = {
    bookingID?: true
    capacity?: true
  }

  export type BookingInfoSumAggregateInputType = {
    bookingID?: true
    capacity?: true
  }

  export type BookingInfoMinAggregateInputType = {
    bookingID?: true
    RoomName?: true
    sendDate?: true
    sender?: true
    senderEmail?: true
    phoneIn?: true
    phoneOut?: true
    jobName?: true
    officeLocation?: true
    purpose?: true
    startDate?: true
    endDate?: true
    capacity?: true
    cfSender?: true
    cfPhone?: true
    SendStatus?: true
    approvedNumber?: true
    RejectReason?: true
    CancelReason?: true
    clearStatus?: true
    damageAction?: true
    remark?: true
    createdAt?: true
    updatedAt?: true
    RecordStatus?: true
    calendarEventId?: true
  }

  export type BookingInfoMaxAggregateInputType = {
    bookingID?: true
    RoomName?: true
    sendDate?: true
    sender?: true
    senderEmail?: true
    phoneIn?: true
    phoneOut?: true
    jobName?: true
    officeLocation?: true
    purpose?: true
    startDate?: true
    endDate?: true
    capacity?: true
    cfSender?: true
    cfPhone?: true
    SendStatus?: true
    approvedNumber?: true
    RejectReason?: true
    CancelReason?: true
    clearStatus?: true
    damageAction?: true
    remark?: true
    createdAt?: true
    updatedAt?: true
    RecordStatus?: true
    calendarEventId?: true
  }

  export type BookingInfoCountAggregateInputType = {
    bookingID?: true
    RoomName?: true
    sendDate?: true
    sender?: true
    senderEmail?: true
    phoneIn?: true
    phoneOut?: true
    jobName?: true
    officeLocation?: true
    purpose?: true
    startDate?: true
    endDate?: true
    capacity?: true
    cfSender?: true
    cfPhone?: true
    SendStatus?: true
    approvedNumber?: true
    RejectReason?: true
    CancelReason?: true
    clearStatus?: true
    damageAction?: true
    remark?: true
    createdAt?: true
    updatedAt?: true
    RecordStatus?: true
    calendarEventId?: true
    _all?: true
  }

  export type BookingInfoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BookingInfo to aggregate.
     */
    where?: BookingInfoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BookingInfos to fetch.
     */
    orderBy?: BookingInfoOrderByWithRelationInput | BookingInfoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BookingInfoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BookingInfos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BookingInfos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned BookingInfos
    **/
    _count?: true | BookingInfoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BookingInfoAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BookingInfoSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BookingInfoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BookingInfoMaxAggregateInputType
  }

  export type GetBookingInfoAggregateType<T extends BookingInfoAggregateArgs> = {
        [P in keyof T & keyof AggregateBookingInfo]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBookingInfo[P]>
      : GetScalarType<T[P], AggregateBookingInfo[P]>
  }




  export type BookingInfoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BookingInfoWhereInput
    orderBy?: BookingInfoOrderByWithAggregationInput | BookingInfoOrderByWithAggregationInput[]
    by: BookingInfoScalarFieldEnum[] | BookingInfoScalarFieldEnum
    having?: BookingInfoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BookingInfoCountAggregateInputType | true
    _avg?: BookingInfoAvgAggregateInputType
    _sum?: BookingInfoSumAggregateInputType
    _min?: BookingInfoMinAggregateInputType
    _max?: BookingInfoMaxAggregateInputType
  }

  export type BookingInfoGroupByOutputType = {
    bookingID: number
    RoomName: string | null
    sendDate: Date | null
    sender: string | null
    senderEmail: string | null
    phoneIn: string | null
    phoneOut: string | null
    jobName: string | null
    officeLocation: string | null
    purpose: string | null
    startDate: Date | null
    endDate: Date | null
    capacity: number | null
    cfSender: string | null
    cfPhone: string | null
    SendStatus: string | null
    approvedNumber: string | null
    RejectReason: string | null
    CancelReason: string | null
    clearStatus: string | null
    damageAction: string | null
    remark: string | null
    createdAt: Date | null
    updatedAt: Date | null
    RecordStatus: string | null
    calendarEventId: string | null
    _count: BookingInfoCountAggregateOutputType | null
    _avg: BookingInfoAvgAggregateOutputType | null
    _sum: BookingInfoSumAggregateOutputType | null
    _min: BookingInfoMinAggregateOutputType | null
    _max: BookingInfoMaxAggregateOutputType | null
  }

  type GetBookingInfoGroupByPayload<T extends BookingInfoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BookingInfoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BookingInfoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BookingInfoGroupByOutputType[P]>
            : GetScalarType<T[P], BookingInfoGroupByOutputType[P]>
        }
      >
    >


  export type BookingInfoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    bookingID?: boolean
    RoomName?: boolean
    sendDate?: boolean
    sender?: boolean
    senderEmail?: boolean
    phoneIn?: boolean
    phoneOut?: boolean
    jobName?: boolean
    officeLocation?: boolean
    purpose?: boolean
    startDate?: boolean
    endDate?: boolean
    capacity?: boolean
    cfSender?: boolean
    cfPhone?: boolean
    SendStatus?: boolean
    approvedNumber?: boolean
    RejectReason?: boolean
    CancelReason?: boolean
    clearStatus?: boolean
    damageAction?: boolean
    remark?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    RecordStatus?: boolean
    calendarEventId?: boolean
  }, ExtArgs["result"]["bookingInfo"]>



  export type BookingInfoSelectScalar = {
    bookingID?: boolean
    RoomName?: boolean
    sendDate?: boolean
    sender?: boolean
    senderEmail?: boolean
    phoneIn?: boolean
    phoneOut?: boolean
    jobName?: boolean
    officeLocation?: boolean
    purpose?: boolean
    startDate?: boolean
    endDate?: boolean
    capacity?: boolean
    cfSender?: boolean
    cfPhone?: boolean
    SendStatus?: boolean
    approvedNumber?: boolean
    RejectReason?: boolean
    CancelReason?: boolean
    clearStatus?: boolean
    damageAction?: boolean
    remark?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    RecordStatus?: boolean
    calendarEventId?: boolean
  }

  export type BookingInfoOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"bookingID" | "RoomName" | "sendDate" | "sender" | "senderEmail" | "phoneIn" | "phoneOut" | "jobName" | "officeLocation" | "purpose" | "startDate" | "endDate" | "capacity" | "cfSender" | "cfPhone" | "SendStatus" | "approvedNumber" | "RejectReason" | "CancelReason" | "clearStatus" | "damageAction" | "remark" | "createdAt" | "updatedAt" | "RecordStatus" | "calendarEventId", ExtArgs["result"]["bookingInfo"]>

  export type $BookingInfoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "BookingInfo"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      bookingID: number
      RoomName: string | null
      sendDate: Date | null
      sender: string | null
      senderEmail: string | null
      phoneIn: string | null
      phoneOut: string | null
      jobName: string | null
      officeLocation: string | null
      purpose: string | null
      startDate: Date | null
      endDate: Date | null
      capacity: number | null
      cfSender: string | null
      cfPhone: string | null
      SendStatus: string | null
      approvedNumber: string | null
      RejectReason: string | null
      CancelReason: string | null
      clearStatus: string | null
      damageAction: string | null
      remark: string | null
      createdAt: Date | null
      updatedAt: Date | null
      RecordStatus: string | null
      calendarEventId: string | null
    }, ExtArgs["result"]["bookingInfo"]>
    composites: {}
  }

  type BookingInfoGetPayload<S extends boolean | null | undefined | BookingInfoDefaultArgs> = $Result.GetResult<Prisma.$BookingInfoPayload, S>

  type BookingInfoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BookingInfoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BookingInfoCountAggregateInputType | true
    }

  export interface BookingInfoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['BookingInfo'], meta: { name: 'BookingInfo' } }
    /**
     * Find zero or one BookingInfo that matches the filter.
     * @param {BookingInfoFindUniqueArgs} args - Arguments to find a BookingInfo
     * @example
     * // Get one BookingInfo
     * const bookingInfo = await prisma.bookingInfo.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BookingInfoFindUniqueArgs>(args: SelectSubset<T, BookingInfoFindUniqueArgs<ExtArgs>>): Prisma__BookingInfoClient<$Result.GetResult<Prisma.$BookingInfoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one BookingInfo that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BookingInfoFindUniqueOrThrowArgs} args - Arguments to find a BookingInfo
     * @example
     * // Get one BookingInfo
     * const bookingInfo = await prisma.bookingInfo.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BookingInfoFindUniqueOrThrowArgs>(args: SelectSubset<T, BookingInfoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BookingInfoClient<$Result.GetResult<Prisma.$BookingInfoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BookingInfo that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingInfoFindFirstArgs} args - Arguments to find a BookingInfo
     * @example
     * // Get one BookingInfo
     * const bookingInfo = await prisma.bookingInfo.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BookingInfoFindFirstArgs>(args?: SelectSubset<T, BookingInfoFindFirstArgs<ExtArgs>>): Prisma__BookingInfoClient<$Result.GetResult<Prisma.$BookingInfoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BookingInfo that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingInfoFindFirstOrThrowArgs} args - Arguments to find a BookingInfo
     * @example
     * // Get one BookingInfo
     * const bookingInfo = await prisma.bookingInfo.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BookingInfoFindFirstOrThrowArgs>(args?: SelectSubset<T, BookingInfoFindFirstOrThrowArgs<ExtArgs>>): Prisma__BookingInfoClient<$Result.GetResult<Prisma.$BookingInfoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more BookingInfos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingInfoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all BookingInfos
     * const bookingInfos = await prisma.bookingInfo.findMany()
     * 
     * // Get first 10 BookingInfos
     * const bookingInfos = await prisma.bookingInfo.findMany({ take: 10 })
     * 
     * // Only select the `bookingID`
     * const bookingInfoWithBookingIDOnly = await prisma.bookingInfo.findMany({ select: { bookingID: true } })
     * 
     */
    findMany<T extends BookingInfoFindManyArgs>(args?: SelectSubset<T, BookingInfoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookingInfoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a BookingInfo.
     * @param {BookingInfoCreateArgs} args - Arguments to create a BookingInfo.
     * @example
     * // Create one BookingInfo
     * const BookingInfo = await prisma.bookingInfo.create({
     *   data: {
     *     // ... data to create a BookingInfo
     *   }
     * })
     * 
     */
    create<T extends BookingInfoCreateArgs>(args: SelectSubset<T, BookingInfoCreateArgs<ExtArgs>>): Prisma__BookingInfoClient<$Result.GetResult<Prisma.$BookingInfoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many BookingInfos.
     * @param {BookingInfoCreateManyArgs} args - Arguments to create many BookingInfos.
     * @example
     * // Create many BookingInfos
     * const bookingInfo = await prisma.bookingInfo.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BookingInfoCreateManyArgs>(args?: SelectSubset<T, BookingInfoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a BookingInfo.
     * @param {BookingInfoDeleteArgs} args - Arguments to delete one BookingInfo.
     * @example
     * // Delete one BookingInfo
     * const BookingInfo = await prisma.bookingInfo.delete({
     *   where: {
     *     // ... filter to delete one BookingInfo
     *   }
     * })
     * 
     */
    delete<T extends BookingInfoDeleteArgs>(args: SelectSubset<T, BookingInfoDeleteArgs<ExtArgs>>): Prisma__BookingInfoClient<$Result.GetResult<Prisma.$BookingInfoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one BookingInfo.
     * @param {BookingInfoUpdateArgs} args - Arguments to update one BookingInfo.
     * @example
     * // Update one BookingInfo
     * const bookingInfo = await prisma.bookingInfo.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BookingInfoUpdateArgs>(args: SelectSubset<T, BookingInfoUpdateArgs<ExtArgs>>): Prisma__BookingInfoClient<$Result.GetResult<Prisma.$BookingInfoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more BookingInfos.
     * @param {BookingInfoDeleteManyArgs} args - Arguments to filter BookingInfos to delete.
     * @example
     * // Delete a few BookingInfos
     * const { count } = await prisma.bookingInfo.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BookingInfoDeleteManyArgs>(args?: SelectSubset<T, BookingInfoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BookingInfos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingInfoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many BookingInfos
     * const bookingInfo = await prisma.bookingInfo.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BookingInfoUpdateManyArgs>(args: SelectSubset<T, BookingInfoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one BookingInfo.
     * @param {BookingInfoUpsertArgs} args - Arguments to update or create a BookingInfo.
     * @example
     * // Update or create a BookingInfo
     * const bookingInfo = await prisma.bookingInfo.upsert({
     *   create: {
     *     // ... data to create a BookingInfo
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the BookingInfo we want to update
     *   }
     * })
     */
    upsert<T extends BookingInfoUpsertArgs>(args: SelectSubset<T, BookingInfoUpsertArgs<ExtArgs>>): Prisma__BookingInfoClient<$Result.GetResult<Prisma.$BookingInfoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of BookingInfos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingInfoCountArgs} args - Arguments to filter BookingInfos to count.
     * @example
     * // Count the number of BookingInfos
     * const count = await prisma.bookingInfo.count({
     *   where: {
     *     // ... the filter for the BookingInfos we want to count
     *   }
     * })
    **/
    count<T extends BookingInfoCountArgs>(
      args?: Subset<T, BookingInfoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BookingInfoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a BookingInfo.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingInfoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends BookingInfoAggregateArgs>(args: Subset<T, BookingInfoAggregateArgs>): Prisma.PrismaPromise<GetBookingInfoAggregateType<T>>

    /**
     * Group by BookingInfo.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingInfoGroupByArgs} args - Group by arguments.
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
      T extends BookingInfoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BookingInfoGroupByArgs['orderBy'] }
        : { orderBy?: BookingInfoGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, BookingInfoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBookingInfoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the BookingInfo model
   */
  readonly fields: BookingInfoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for BookingInfo.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BookingInfoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the BookingInfo model
   */
  interface BookingInfoFieldRefs {
    readonly bookingID: FieldRef<"BookingInfo", 'Int'>
    readonly RoomName: FieldRef<"BookingInfo", 'String'>
    readonly sendDate: FieldRef<"BookingInfo", 'DateTime'>
    readonly sender: FieldRef<"BookingInfo", 'String'>
    readonly senderEmail: FieldRef<"BookingInfo", 'String'>
    readonly phoneIn: FieldRef<"BookingInfo", 'String'>
    readonly phoneOut: FieldRef<"BookingInfo", 'String'>
    readonly jobName: FieldRef<"BookingInfo", 'String'>
    readonly officeLocation: FieldRef<"BookingInfo", 'String'>
    readonly purpose: FieldRef<"BookingInfo", 'String'>
    readonly startDate: FieldRef<"BookingInfo", 'DateTime'>
    readonly endDate: FieldRef<"BookingInfo", 'DateTime'>
    readonly capacity: FieldRef<"BookingInfo", 'Int'>
    readonly cfSender: FieldRef<"BookingInfo", 'String'>
    readonly cfPhone: FieldRef<"BookingInfo", 'String'>
    readonly SendStatus: FieldRef<"BookingInfo", 'String'>
    readonly approvedNumber: FieldRef<"BookingInfo", 'String'>
    readonly RejectReason: FieldRef<"BookingInfo", 'String'>
    readonly CancelReason: FieldRef<"BookingInfo", 'String'>
    readonly clearStatus: FieldRef<"BookingInfo", 'String'>
    readonly damageAction: FieldRef<"BookingInfo", 'String'>
    readonly remark: FieldRef<"BookingInfo", 'String'>
    readonly createdAt: FieldRef<"BookingInfo", 'DateTime'>
    readonly updatedAt: FieldRef<"BookingInfo", 'DateTime'>
    readonly RecordStatus: FieldRef<"BookingInfo", 'String'>
    readonly calendarEventId: FieldRef<"BookingInfo", 'String'>
  }
    

  // Custom InputTypes
  /**
   * BookingInfo findUnique
   */
  export type BookingInfoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookingInfo
     */
    select?: BookingInfoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BookingInfo
     */
    omit?: BookingInfoOmit<ExtArgs> | null
    /**
     * Filter, which BookingInfo to fetch.
     */
    where: BookingInfoWhereUniqueInput
  }

  /**
   * BookingInfo findUniqueOrThrow
   */
  export type BookingInfoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookingInfo
     */
    select?: BookingInfoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BookingInfo
     */
    omit?: BookingInfoOmit<ExtArgs> | null
    /**
     * Filter, which BookingInfo to fetch.
     */
    where: BookingInfoWhereUniqueInput
  }

  /**
   * BookingInfo findFirst
   */
  export type BookingInfoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookingInfo
     */
    select?: BookingInfoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BookingInfo
     */
    omit?: BookingInfoOmit<ExtArgs> | null
    /**
     * Filter, which BookingInfo to fetch.
     */
    where?: BookingInfoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BookingInfos to fetch.
     */
    orderBy?: BookingInfoOrderByWithRelationInput | BookingInfoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BookingInfos.
     */
    cursor?: BookingInfoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BookingInfos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BookingInfos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BookingInfos.
     */
    distinct?: BookingInfoScalarFieldEnum | BookingInfoScalarFieldEnum[]
  }

  /**
   * BookingInfo findFirstOrThrow
   */
  export type BookingInfoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookingInfo
     */
    select?: BookingInfoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BookingInfo
     */
    omit?: BookingInfoOmit<ExtArgs> | null
    /**
     * Filter, which BookingInfo to fetch.
     */
    where?: BookingInfoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BookingInfos to fetch.
     */
    orderBy?: BookingInfoOrderByWithRelationInput | BookingInfoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BookingInfos.
     */
    cursor?: BookingInfoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BookingInfos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BookingInfos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BookingInfos.
     */
    distinct?: BookingInfoScalarFieldEnum | BookingInfoScalarFieldEnum[]
  }

  /**
   * BookingInfo findMany
   */
  export type BookingInfoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookingInfo
     */
    select?: BookingInfoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BookingInfo
     */
    omit?: BookingInfoOmit<ExtArgs> | null
    /**
     * Filter, which BookingInfos to fetch.
     */
    where?: BookingInfoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BookingInfos to fetch.
     */
    orderBy?: BookingInfoOrderByWithRelationInput | BookingInfoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing BookingInfos.
     */
    cursor?: BookingInfoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BookingInfos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BookingInfos.
     */
    skip?: number
    distinct?: BookingInfoScalarFieldEnum | BookingInfoScalarFieldEnum[]
  }

  /**
   * BookingInfo create
   */
  export type BookingInfoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookingInfo
     */
    select?: BookingInfoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BookingInfo
     */
    omit?: BookingInfoOmit<ExtArgs> | null
    /**
     * The data needed to create a BookingInfo.
     */
    data?: XOR<BookingInfoCreateInput, BookingInfoUncheckedCreateInput>
  }

  /**
   * BookingInfo createMany
   */
  export type BookingInfoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many BookingInfos.
     */
    data: BookingInfoCreateManyInput | BookingInfoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * BookingInfo update
   */
  export type BookingInfoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookingInfo
     */
    select?: BookingInfoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BookingInfo
     */
    omit?: BookingInfoOmit<ExtArgs> | null
    /**
     * The data needed to update a BookingInfo.
     */
    data: XOR<BookingInfoUpdateInput, BookingInfoUncheckedUpdateInput>
    /**
     * Choose, which BookingInfo to update.
     */
    where: BookingInfoWhereUniqueInput
  }

  /**
   * BookingInfo updateMany
   */
  export type BookingInfoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update BookingInfos.
     */
    data: XOR<BookingInfoUpdateManyMutationInput, BookingInfoUncheckedUpdateManyInput>
    /**
     * Filter which BookingInfos to update
     */
    where?: BookingInfoWhereInput
    /**
     * Limit how many BookingInfos to update.
     */
    limit?: number
  }

  /**
   * BookingInfo upsert
   */
  export type BookingInfoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookingInfo
     */
    select?: BookingInfoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BookingInfo
     */
    omit?: BookingInfoOmit<ExtArgs> | null
    /**
     * The filter to search for the BookingInfo to update in case it exists.
     */
    where: BookingInfoWhereUniqueInput
    /**
     * In case the BookingInfo found by the `where` argument doesn't exist, create a new BookingInfo with this data.
     */
    create: XOR<BookingInfoCreateInput, BookingInfoUncheckedCreateInput>
    /**
     * In case the BookingInfo was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BookingInfoUpdateInput, BookingInfoUncheckedUpdateInput>
  }

  /**
   * BookingInfo delete
   */
  export type BookingInfoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookingInfo
     */
    select?: BookingInfoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BookingInfo
     */
    omit?: BookingInfoOmit<ExtArgs> | null
    /**
     * Filter which BookingInfo to delete.
     */
    where: BookingInfoWhereUniqueInput
  }

  /**
   * BookingInfo deleteMany
   */
  export type BookingInfoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BookingInfos to delete
     */
    where?: BookingInfoWhereInput
    /**
     * Limit how many BookingInfos to delete.
     */
    limit?: number
  }

  /**
   * BookingInfo without action
   */
  export type BookingInfoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookingInfo
     */
    select?: BookingInfoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BookingInfo
     */
    omit?: BookingInfoOmit<ExtArgs> | null
  }


  /**
   * Model RoomUsageStats
   */

  export type AggregateRoomUsageStats = {
    _count: RoomUsageStatsCountAggregateOutputType | null
    _avg: RoomUsageStatsAvgAggregateOutputType | null
    _sum: RoomUsageStatsSumAggregateOutputType | null
    _min: RoomUsageStatsMinAggregateOutputType | null
    _max: RoomUsageStatsMaxAggregateOutputType | null
  }

  export type RoomUsageStatsAvgAggregateOutputType = {
    id: number | null
    totalUsage: number | null
    totalWorkHours: number | null
  }

  export type RoomUsageStatsSumAggregateOutputType = {
    id: number | null
    totalUsage: number | null
    totalWorkHours: number | null
  }

  export type RoomUsageStatsMinAggregateOutputType = {
    id: number | null
    RoomName: string | null
    totalUsage: number | null
    totalWorkHours: number | null
    updatedAt: Date | null
  }

  export type RoomUsageStatsMaxAggregateOutputType = {
    id: number | null
    RoomName: string | null
    totalUsage: number | null
    totalWorkHours: number | null
    updatedAt: Date | null
  }

  export type RoomUsageStatsCountAggregateOutputType = {
    id: number
    RoomName: number
    totalUsage: number
    totalWorkHours: number
    updatedAt: number
    _all: number
  }


  export type RoomUsageStatsAvgAggregateInputType = {
    id?: true
    totalUsage?: true
    totalWorkHours?: true
  }

  export type RoomUsageStatsSumAggregateInputType = {
    id?: true
    totalUsage?: true
    totalWorkHours?: true
  }

  export type RoomUsageStatsMinAggregateInputType = {
    id?: true
    RoomName?: true
    totalUsage?: true
    totalWorkHours?: true
    updatedAt?: true
  }

  export type RoomUsageStatsMaxAggregateInputType = {
    id?: true
    RoomName?: true
    totalUsage?: true
    totalWorkHours?: true
    updatedAt?: true
  }

  export type RoomUsageStatsCountAggregateInputType = {
    id?: true
    RoomName?: true
    totalUsage?: true
    totalWorkHours?: true
    updatedAt?: true
    _all?: true
  }

  export type RoomUsageStatsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RoomUsageStats to aggregate.
     */
    where?: RoomUsageStatsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RoomUsageStats to fetch.
     */
    orderBy?: RoomUsageStatsOrderByWithRelationInput | RoomUsageStatsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RoomUsageStatsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RoomUsageStats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RoomUsageStats.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RoomUsageStats
    **/
    _count?: true | RoomUsageStatsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RoomUsageStatsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RoomUsageStatsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RoomUsageStatsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RoomUsageStatsMaxAggregateInputType
  }

  export type GetRoomUsageStatsAggregateType<T extends RoomUsageStatsAggregateArgs> = {
        [P in keyof T & keyof AggregateRoomUsageStats]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRoomUsageStats[P]>
      : GetScalarType<T[P], AggregateRoomUsageStats[P]>
  }




  export type RoomUsageStatsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RoomUsageStatsWhereInput
    orderBy?: RoomUsageStatsOrderByWithAggregationInput | RoomUsageStatsOrderByWithAggregationInput[]
    by: RoomUsageStatsScalarFieldEnum[] | RoomUsageStatsScalarFieldEnum
    having?: RoomUsageStatsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RoomUsageStatsCountAggregateInputType | true
    _avg?: RoomUsageStatsAvgAggregateInputType
    _sum?: RoomUsageStatsSumAggregateInputType
    _min?: RoomUsageStatsMinAggregateInputType
    _max?: RoomUsageStatsMaxAggregateInputType
  }

  export type RoomUsageStatsGroupByOutputType = {
    id: number
    RoomName: string
    totalUsage: number
    totalWorkHours: number
    updatedAt: Date
    _count: RoomUsageStatsCountAggregateOutputType | null
    _avg: RoomUsageStatsAvgAggregateOutputType | null
    _sum: RoomUsageStatsSumAggregateOutputType | null
    _min: RoomUsageStatsMinAggregateOutputType | null
    _max: RoomUsageStatsMaxAggregateOutputType | null
  }

  type GetRoomUsageStatsGroupByPayload<T extends RoomUsageStatsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RoomUsageStatsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RoomUsageStatsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RoomUsageStatsGroupByOutputType[P]>
            : GetScalarType<T[P], RoomUsageStatsGroupByOutputType[P]>
        }
      >
    >


  export type RoomUsageStatsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    RoomName?: boolean
    totalUsage?: boolean
    totalWorkHours?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["roomUsageStats"]>



  export type RoomUsageStatsSelectScalar = {
    id?: boolean
    RoomName?: boolean
    totalUsage?: boolean
    totalWorkHours?: boolean
    updatedAt?: boolean
  }

  export type RoomUsageStatsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "RoomName" | "totalUsage" | "totalWorkHours" | "updatedAt", ExtArgs["result"]["roomUsageStats"]>

  export type $RoomUsageStatsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RoomUsageStats"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      RoomName: string
      totalUsage: number
      totalWorkHours: number
      updatedAt: Date
    }, ExtArgs["result"]["roomUsageStats"]>
    composites: {}
  }

  type RoomUsageStatsGetPayload<S extends boolean | null | undefined | RoomUsageStatsDefaultArgs> = $Result.GetResult<Prisma.$RoomUsageStatsPayload, S>

  type RoomUsageStatsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RoomUsageStatsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RoomUsageStatsCountAggregateInputType | true
    }

  export interface RoomUsageStatsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RoomUsageStats'], meta: { name: 'RoomUsageStats' } }
    /**
     * Find zero or one RoomUsageStats that matches the filter.
     * @param {RoomUsageStatsFindUniqueArgs} args - Arguments to find a RoomUsageStats
     * @example
     * // Get one RoomUsageStats
     * const roomUsageStats = await prisma.roomUsageStats.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RoomUsageStatsFindUniqueArgs>(args: SelectSubset<T, RoomUsageStatsFindUniqueArgs<ExtArgs>>): Prisma__RoomUsageStatsClient<$Result.GetResult<Prisma.$RoomUsageStatsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one RoomUsageStats that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RoomUsageStatsFindUniqueOrThrowArgs} args - Arguments to find a RoomUsageStats
     * @example
     * // Get one RoomUsageStats
     * const roomUsageStats = await prisma.roomUsageStats.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RoomUsageStatsFindUniqueOrThrowArgs>(args: SelectSubset<T, RoomUsageStatsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RoomUsageStatsClient<$Result.GetResult<Prisma.$RoomUsageStatsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RoomUsageStats that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomUsageStatsFindFirstArgs} args - Arguments to find a RoomUsageStats
     * @example
     * // Get one RoomUsageStats
     * const roomUsageStats = await prisma.roomUsageStats.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RoomUsageStatsFindFirstArgs>(args?: SelectSubset<T, RoomUsageStatsFindFirstArgs<ExtArgs>>): Prisma__RoomUsageStatsClient<$Result.GetResult<Prisma.$RoomUsageStatsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RoomUsageStats that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomUsageStatsFindFirstOrThrowArgs} args - Arguments to find a RoomUsageStats
     * @example
     * // Get one RoomUsageStats
     * const roomUsageStats = await prisma.roomUsageStats.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RoomUsageStatsFindFirstOrThrowArgs>(args?: SelectSubset<T, RoomUsageStatsFindFirstOrThrowArgs<ExtArgs>>): Prisma__RoomUsageStatsClient<$Result.GetResult<Prisma.$RoomUsageStatsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more RoomUsageStats that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomUsageStatsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RoomUsageStats
     * const roomUsageStats = await prisma.roomUsageStats.findMany()
     * 
     * // Get first 10 RoomUsageStats
     * const roomUsageStats = await prisma.roomUsageStats.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const roomUsageStatsWithIdOnly = await prisma.roomUsageStats.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RoomUsageStatsFindManyArgs>(args?: SelectSubset<T, RoomUsageStatsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoomUsageStatsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a RoomUsageStats.
     * @param {RoomUsageStatsCreateArgs} args - Arguments to create a RoomUsageStats.
     * @example
     * // Create one RoomUsageStats
     * const RoomUsageStats = await prisma.roomUsageStats.create({
     *   data: {
     *     // ... data to create a RoomUsageStats
     *   }
     * })
     * 
     */
    create<T extends RoomUsageStatsCreateArgs>(args: SelectSubset<T, RoomUsageStatsCreateArgs<ExtArgs>>): Prisma__RoomUsageStatsClient<$Result.GetResult<Prisma.$RoomUsageStatsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many RoomUsageStats.
     * @param {RoomUsageStatsCreateManyArgs} args - Arguments to create many RoomUsageStats.
     * @example
     * // Create many RoomUsageStats
     * const roomUsageStats = await prisma.roomUsageStats.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RoomUsageStatsCreateManyArgs>(args?: SelectSubset<T, RoomUsageStatsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a RoomUsageStats.
     * @param {RoomUsageStatsDeleteArgs} args - Arguments to delete one RoomUsageStats.
     * @example
     * // Delete one RoomUsageStats
     * const RoomUsageStats = await prisma.roomUsageStats.delete({
     *   where: {
     *     // ... filter to delete one RoomUsageStats
     *   }
     * })
     * 
     */
    delete<T extends RoomUsageStatsDeleteArgs>(args: SelectSubset<T, RoomUsageStatsDeleteArgs<ExtArgs>>): Prisma__RoomUsageStatsClient<$Result.GetResult<Prisma.$RoomUsageStatsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one RoomUsageStats.
     * @param {RoomUsageStatsUpdateArgs} args - Arguments to update one RoomUsageStats.
     * @example
     * // Update one RoomUsageStats
     * const roomUsageStats = await prisma.roomUsageStats.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RoomUsageStatsUpdateArgs>(args: SelectSubset<T, RoomUsageStatsUpdateArgs<ExtArgs>>): Prisma__RoomUsageStatsClient<$Result.GetResult<Prisma.$RoomUsageStatsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more RoomUsageStats.
     * @param {RoomUsageStatsDeleteManyArgs} args - Arguments to filter RoomUsageStats to delete.
     * @example
     * // Delete a few RoomUsageStats
     * const { count } = await prisma.roomUsageStats.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RoomUsageStatsDeleteManyArgs>(args?: SelectSubset<T, RoomUsageStatsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RoomUsageStats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomUsageStatsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RoomUsageStats
     * const roomUsageStats = await prisma.roomUsageStats.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RoomUsageStatsUpdateManyArgs>(args: SelectSubset<T, RoomUsageStatsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one RoomUsageStats.
     * @param {RoomUsageStatsUpsertArgs} args - Arguments to update or create a RoomUsageStats.
     * @example
     * // Update or create a RoomUsageStats
     * const roomUsageStats = await prisma.roomUsageStats.upsert({
     *   create: {
     *     // ... data to create a RoomUsageStats
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RoomUsageStats we want to update
     *   }
     * })
     */
    upsert<T extends RoomUsageStatsUpsertArgs>(args: SelectSubset<T, RoomUsageStatsUpsertArgs<ExtArgs>>): Prisma__RoomUsageStatsClient<$Result.GetResult<Prisma.$RoomUsageStatsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of RoomUsageStats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomUsageStatsCountArgs} args - Arguments to filter RoomUsageStats to count.
     * @example
     * // Count the number of RoomUsageStats
     * const count = await prisma.roomUsageStats.count({
     *   where: {
     *     // ... the filter for the RoomUsageStats we want to count
     *   }
     * })
    **/
    count<T extends RoomUsageStatsCountArgs>(
      args?: Subset<T, RoomUsageStatsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RoomUsageStatsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RoomUsageStats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomUsageStatsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends RoomUsageStatsAggregateArgs>(args: Subset<T, RoomUsageStatsAggregateArgs>): Prisma.PrismaPromise<GetRoomUsageStatsAggregateType<T>>

    /**
     * Group by RoomUsageStats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomUsageStatsGroupByArgs} args - Group by arguments.
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
      T extends RoomUsageStatsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RoomUsageStatsGroupByArgs['orderBy'] }
        : { orderBy?: RoomUsageStatsGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, RoomUsageStatsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRoomUsageStatsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RoomUsageStats model
   */
  readonly fields: RoomUsageStatsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RoomUsageStats.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RoomUsageStatsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the RoomUsageStats model
   */
  interface RoomUsageStatsFieldRefs {
    readonly id: FieldRef<"RoomUsageStats", 'Int'>
    readonly RoomName: FieldRef<"RoomUsageStats", 'String'>
    readonly totalUsage: FieldRef<"RoomUsageStats", 'Int'>
    readonly totalWorkHours: FieldRef<"RoomUsageStats", 'Int'>
    readonly updatedAt: FieldRef<"RoomUsageStats", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * RoomUsageStats findUnique
   */
  export type RoomUsageStatsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomUsageStats
     */
    select?: RoomUsageStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomUsageStats
     */
    omit?: RoomUsageStatsOmit<ExtArgs> | null
    /**
     * Filter, which RoomUsageStats to fetch.
     */
    where: RoomUsageStatsWhereUniqueInput
  }

  /**
   * RoomUsageStats findUniqueOrThrow
   */
  export type RoomUsageStatsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomUsageStats
     */
    select?: RoomUsageStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomUsageStats
     */
    omit?: RoomUsageStatsOmit<ExtArgs> | null
    /**
     * Filter, which RoomUsageStats to fetch.
     */
    where: RoomUsageStatsWhereUniqueInput
  }

  /**
   * RoomUsageStats findFirst
   */
  export type RoomUsageStatsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomUsageStats
     */
    select?: RoomUsageStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomUsageStats
     */
    omit?: RoomUsageStatsOmit<ExtArgs> | null
    /**
     * Filter, which RoomUsageStats to fetch.
     */
    where?: RoomUsageStatsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RoomUsageStats to fetch.
     */
    orderBy?: RoomUsageStatsOrderByWithRelationInput | RoomUsageStatsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RoomUsageStats.
     */
    cursor?: RoomUsageStatsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RoomUsageStats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RoomUsageStats.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RoomUsageStats.
     */
    distinct?: RoomUsageStatsScalarFieldEnum | RoomUsageStatsScalarFieldEnum[]
  }

  /**
   * RoomUsageStats findFirstOrThrow
   */
  export type RoomUsageStatsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomUsageStats
     */
    select?: RoomUsageStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomUsageStats
     */
    omit?: RoomUsageStatsOmit<ExtArgs> | null
    /**
     * Filter, which RoomUsageStats to fetch.
     */
    where?: RoomUsageStatsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RoomUsageStats to fetch.
     */
    orderBy?: RoomUsageStatsOrderByWithRelationInput | RoomUsageStatsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RoomUsageStats.
     */
    cursor?: RoomUsageStatsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RoomUsageStats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RoomUsageStats.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RoomUsageStats.
     */
    distinct?: RoomUsageStatsScalarFieldEnum | RoomUsageStatsScalarFieldEnum[]
  }

  /**
   * RoomUsageStats findMany
   */
  export type RoomUsageStatsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomUsageStats
     */
    select?: RoomUsageStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomUsageStats
     */
    omit?: RoomUsageStatsOmit<ExtArgs> | null
    /**
     * Filter, which RoomUsageStats to fetch.
     */
    where?: RoomUsageStatsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RoomUsageStats to fetch.
     */
    orderBy?: RoomUsageStatsOrderByWithRelationInput | RoomUsageStatsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RoomUsageStats.
     */
    cursor?: RoomUsageStatsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RoomUsageStats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RoomUsageStats.
     */
    skip?: number
    distinct?: RoomUsageStatsScalarFieldEnum | RoomUsageStatsScalarFieldEnum[]
  }

  /**
   * RoomUsageStats create
   */
  export type RoomUsageStatsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomUsageStats
     */
    select?: RoomUsageStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomUsageStats
     */
    omit?: RoomUsageStatsOmit<ExtArgs> | null
    /**
     * The data needed to create a RoomUsageStats.
     */
    data: XOR<RoomUsageStatsCreateInput, RoomUsageStatsUncheckedCreateInput>
  }

  /**
   * RoomUsageStats createMany
   */
  export type RoomUsageStatsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RoomUsageStats.
     */
    data: RoomUsageStatsCreateManyInput | RoomUsageStatsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RoomUsageStats update
   */
  export type RoomUsageStatsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomUsageStats
     */
    select?: RoomUsageStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomUsageStats
     */
    omit?: RoomUsageStatsOmit<ExtArgs> | null
    /**
     * The data needed to update a RoomUsageStats.
     */
    data: XOR<RoomUsageStatsUpdateInput, RoomUsageStatsUncheckedUpdateInput>
    /**
     * Choose, which RoomUsageStats to update.
     */
    where: RoomUsageStatsWhereUniqueInput
  }

  /**
   * RoomUsageStats updateMany
   */
  export type RoomUsageStatsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RoomUsageStats.
     */
    data: XOR<RoomUsageStatsUpdateManyMutationInput, RoomUsageStatsUncheckedUpdateManyInput>
    /**
     * Filter which RoomUsageStats to update
     */
    where?: RoomUsageStatsWhereInput
    /**
     * Limit how many RoomUsageStats to update.
     */
    limit?: number
  }

  /**
   * RoomUsageStats upsert
   */
  export type RoomUsageStatsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomUsageStats
     */
    select?: RoomUsageStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomUsageStats
     */
    omit?: RoomUsageStatsOmit<ExtArgs> | null
    /**
     * The filter to search for the RoomUsageStats to update in case it exists.
     */
    where: RoomUsageStatsWhereUniqueInput
    /**
     * In case the RoomUsageStats found by the `where` argument doesn't exist, create a new RoomUsageStats with this data.
     */
    create: XOR<RoomUsageStatsCreateInput, RoomUsageStatsUncheckedCreateInput>
    /**
     * In case the RoomUsageStats was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RoomUsageStatsUpdateInput, RoomUsageStatsUncheckedUpdateInput>
  }

  /**
   * RoomUsageStats delete
   */
  export type RoomUsageStatsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomUsageStats
     */
    select?: RoomUsageStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomUsageStats
     */
    omit?: RoomUsageStatsOmit<ExtArgs> | null
    /**
     * Filter which RoomUsageStats to delete.
     */
    where: RoomUsageStatsWhereUniqueInput
  }

  /**
   * RoomUsageStats deleteMany
   */
  export type RoomUsageStatsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RoomUsageStats to delete
     */
    where?: RoomUsageStatsWhereInput
    /**
     * Limit how many RoomUsageStats to delete.
     */
    limit?: number
  }

  /**
   * RoomUsageStats without action
   */
  export type RoomUsageStatsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomUsageStats
     */
    select?: RoomUsageStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomUsageStats
     */
    omit?: RoomUsageStatsOmit<ExtArgs> | null
  }


  /**
   * Model Signature
   */

  export type AggregateSignature = {
    _count: SignatureCountAggregateOutputType | null
    _avg: SignatureAvgAggregateOutputType | null
    _sum: SignatureSumAggregateOutputType | null
    _min: SignatureMinAggregateOutputType | null
    _max: SignatureMaxAggregateOutputType | null
  }

  export type SignatureAvgAggregateOutputType = {
    id: number | null
  }

  export type SignatureSumAggregateOutputType = {
    id: number | null
  }

  export type SignatureMinAggregateOutputType = {
    id: number | null
    userEmail: string | null
    fileName: string | null
  }

  export type SignatureMaxAggregateOutputType = {
    id: number | null
    userEmail: string | null
    fileName: string | null
  }

  export type SignatureCountAggregateOutputType = {
    id: number
    userEmail: number
    fileName: number
    _all: number
  }


  export type SignatureAvgAggregateInputType = {
    id?: true
  }

  export type SignatureSumAggregateInputType = {
    id?: true
  }

  export type SignatureMinAggregateInputType = {
    id?: true
    userEmail?: true
    fileName?: true
  }

  export type SignatureMaxAggregateInputType = {
    id?: true
    userEmail?: true
    fileName?: true
  }

  export type SignatureCountAggregateInputType = {
    id?: true
    userEmail?: true
    fileName?: true
    _all?: true
  }

  export type SignatureAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Signature to aggregate.
     */
    where?: SignatureWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Signatures to fetch.
     */
    orderBy?: SignatureOrderByWithRelationInput | SignatureOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SignatureWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Signatures from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Signatures.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Signatures
    **/
    _count?: true | SignatureCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SignatureAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SignatureSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SignatureMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SignatureMaxAggregateInputType
  }

  export type GetSignatureAggregateType<T extends SignatureAggregateArgs> = {
        [P in keyof T & keyof AggregateSignature]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSignature[P]>
      : GetScalarType<T[P], AggregateSignature[P]>
  }




  export type SignatureGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SignatureWhereInput
    orderBy?: SignatureOrderByWithAggregationInput | SignatureOrderByWithAggregationInput[]
    by: SignatureScalarFieldEnum[] | SignatureScalarFieldEnum
    having?: SignatureScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SignatureCountAggregateInputType | true
    _avg?: SignatureAvgAggregateInputType
    _sum?: SignatureSumAggregateInputType
    _min?: SignatureMinAggregateInputType
    _max?: SignatureMaxAggregateInputType
  }

  export type SignatureGroupByOutputType = {
    id: number
    userEmail: string
    fileName: string
    _count: SignatureCountAggregateOutputType | null
    _avg: SignatureAvgAggregateOutputType | null
    _sum: SignatureSumAggregateOutputType | null
    _min: SignatureMinAggregateOutputType | null
    _max: SignatureMaxAggregateOutputType | null
  }

  type GetSignatureGroupByPayload<T extends SignatureGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SignatureGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SignatureGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SignatureGroupByOutputType[P]>
            : GetScalarType<T[P], SignatureGroupByOutputType[P]>
        }
      >
    >


  export type SignatureSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userEmail?: boolean
    fileName?: boolean
  }, ExtArgs["result"]["signature"]>



  export type SignatureSelectScalar = {
    id?: boolean
    userEmail?: boolean
    fileName?: boolean
  }

  export type SignatureOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userEmail" | "fileName", ExtArgs["result"]["signature"]>

  export type $SignaturePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Signature"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      userEmail: string
      fileName: string
    }, ExtArgs["result"]["signature"]>
    composites: {}
  }

  type SignatureGetPayload<S extends boolean | null | undefined | SignatureDefaultArgs> = $Result.GetResult<Prisma.$SignaturePayload, S>

  type SignatureCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SignatureFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SignatureCountAggregateInputType | true
    }

  export interface SignatureDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Signature'], meta: { name: 'Signature' } }
    /**
     * Find zero or one Signature that matches the filter.
     * @param {SignatureFindUniqueArgs} args - Arguments to find a Signature
     * @example
     * // Get one Signature
     * const signature = await prisma.signature.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SignatureFindUniqueArgs>(args: SelectSubset<T, SignatureFindUniqueArgs<ExtArgs>>): Prisma__SignatureClient<$Result.GetResult<Prisma.$SignaturePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Signature that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SignatureFindUniqueOrThrowArgs} args - Arguments to find a Signature
     * @example
     * // Get one Signature
     * const signature = await prisma.signature.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SignatureFindUniqueOrThrowArgs>(args: SelectSubset<T, SignatureFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SignatureClient<$Result.GetResult<Prisma.$SignaturePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Signature that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SignatureFindFirstArgs} args - Arguments to find a Signature
     * @example
     * // Get one Signature
     * const signature = await prisma.signature.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SignatureFindFirstArgs>(args?: SelectSubset<T, SignatureFindFirstArgs<ExtArgs>>): Prisma__SignatureClient<$Result.GetResult<Prisma.$SignaturePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Signature that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SignatureFindFirstOrThrowArgs} args - Arguments to find a Signature
     * @example
     * // Get one Signature
     * const signature = await prisma.signature.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SignatureFindFirstOrThrowArgs>(args?: SelectSubset<T, SignatureFindFirstOrThrowArgs<ExtArgs>>): Prisma__SignatureClient<$Result.GetResult<Prisma.$SignaturePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Signatures that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SignatureFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Signatures
     * const signatures = await prisma.signature.findMany()
     * 
     * // Get first 10 Signatures
     * const signatures = await prisma.signature.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const signatureWithIdOnly = await prisma.signature.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SignatureFindManyArgs>(args?: SelectSubset<T, SignatureFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SignaturePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Signature.
     * @param {SignatureCreateArgs} args - Arguments to create a Signature.
     * @example
     * // Create one Signature
     * const Signature = await prisma.signature.create({
     *   data: {
     *     // ... data to create a Signature
     *   }
     * })
     * 
     */
    create<T extends SignatureCreateArgs>(args: SelectSubset<T, SignatureCreateArgs<ExtArgs>>): Prisma__SignatureClient<$Result.GetResult<Prisma.$SignaturePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Signatures.
     * @param {SignatureCreateManyArgs} args - Arguments to create many Signatures.
     * @example
     * // Create many Signatures
     * const signature = await prisma.signature.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SignatureCreateManyArgs>(args?: SelectSubset<T, SignatureCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Signature.
     * @param {SignatureDeleteArgs} args - Arguments to delete one Signature.
     * @example
     * // Delete one Signature
     * const Signature = await prisma.signature.delete({
     *   where: {
     *     // ... filter to delete one Signature
     *   }
     * })
     * 
     */
    delete<T extends SignatureDeleteArgs>(args: SelectSubset<T, SignatureDeleteArgs<ExtArgs>>): Prisma__SignatureClient<$Result.GetResult<Prisma.$SignaturePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Signature.
     * @param {SignatureUpdateArgs} args - Arguments to update one Signature.
     * @example
     * // Update one Signature
     * const signature = await prisma.signature.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SignatureUpdateArgs>(args: SelectSubset<T, SignatureUpdateArgs<ExtArgs>>): Prisma__SignatureClient<$Result.GetResult<Prisma.$SignaturePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Signatures.
     * @param {SignatureDeleteManyArgs} args - Arguments to filter Signatures to delete.
     * @example
     * // Delete a few Signatures
     * const { count } = await prisma.signature.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SignatureDeleteManyArgs>(args?: SelectSubset<T, SignatureDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Signatures.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SignatureUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Signatures
     * const signature = await prisma.signature.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SignatureUpdateManyArgs>(args: SelectSubset<T, SignatureUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Signature.
     * @param {SignatureUpsertArgs} args - Arguments to update or create a Signature.
     * @example
     * // Update or create a Signature
     * const signature = await prisma.signature.upsert({
     *   create: {
     *     // ... data to create a Signature
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Signature we want to update
     *   }
     * })
     */
    upsert<T extends SignatureUpsertArgs>(args: SelectSubset<T, SignatureUpsertArgs<ExtArgs>>): Prisma__SignatureClient<$Result.GetResult<Prisma.$SignaturePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Signatures.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SignatureCountArgs} args - Arguments to filter Signatures to count.
     * @example
     * // Count the number of Signatures
     * const count = await prisma.signature.count({
     *   where: {
     *     // ... the filter for the Signatures we want to count
     *   }
     * })
    **/
    count<T extends SignatureCountArgs>(
      args?: Subset<T, SignatureCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SignatureCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Signature.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SignatureAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends SignatureAggregateArgs>(args: Subset<T, SignatureAggregateArgs>): Prisma.PrismaPromise<GetSignatureAggregateType<T>>

    /**
     * Group by Signature.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SignatureGroupByArgs} args - Group by arguments.
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
      T extends SignatureGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SignatureGroupByArgs['orderBy'] }
        : { orderBy?: SignatureGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, SignatureGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSignatureGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Signature model
   */
  readonly fields: SignatureFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Signature.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SignatureClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the Signature model
   */
  interface SignatureFieldRefs {
    readonly id: FieldRef<"Signature", 'Int'>
    readonly userEmail: FieldRef<"Signature", 'String'>
    readonly fileName: FieldRef<"Signature", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Signature findUnique
   */
  export type SignatureFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Signature
     */
    select?: SignatureSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Signature
     */
    omit?: SignatureOmit<ExtArgs> | null
    /**
     * Filter, which Signature to fetch.
     */
    where: SignatureWhereUniqueInput
  }

  /**
   * Signature findUniqueOrThrow
   */
  export type SignatureFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Signature
     */
    select?: SignatureSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Signature
     */
    omit?: SignatureOmit<ExtArgs> | null
    /**
     * Filter, which Signature to fetch.
     */
    where: SignatureWhereUniqueInput
  }

  /**
   * Signature findFirst
   */
  export type SignatureFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Signature
     */
    select?: SignatureSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Signature
     */
    omit?: SignatureOmit<ExtArgs> | null
    /**
     * Filter, which Signature to fetch.
     */
    where?: SignatureWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Signatures to fetch.
     */
    orderBy?: SignatureOrderByWithRelationInput | SignatureOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Signatures.
     */
    cursor?: SignatureWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Signatures from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Signatures.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Signatures.
     */
    distinct?: SignatureScalarFieldEnum | SignatureScalarFieldEnum[]
  }

  /**
   * Signature findFirstOrThrow
   */
  export type SignatureFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Signature
     */
    select?: SignatureSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Signature
     */
    omit?: SignatureOmit<ExtArgs> | null
    /**
     * Filter, which Signature to fetch.
     */
    where?: SignatureWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Signatures to fetch.
     */
    orderBy?: SignatureOrderByWithRelationInput | SignatureOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Signatures.
     */
    cursor?: SignatureWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Signatures from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Signatures.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Signatures.
     */
    distinct?: SignatureScalarFieldEnum | SignatureScalarFieldEnum[]
  }

  /**
   * Signature findMany
   */
  export type SignatureFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Signature
     */
    select?: SignatureSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Signature
     */
    omit?: SignatureOmit<ExtArgs> | null
    /**
     * Filter, which Signatures to fetch.
     */
    where?: SignatureWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Signatures to fetch.
     */
    orderBy?: SignatureOrderByWithRelationInput | SignatureOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Signatures.
     */
    cursor?: SignatureWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Signatures from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Signatures.
     */
    skip?: number
    distinct?: SignatureScalarFieldEnum | SignatureScalarFieldEnum[]
  }

  /**
   * Signature create
   */
  export type SignatureCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Signature
     */
    select?: SignatureSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Signature
     */
    omit?: SignatureOmit<ExtArgs> | null
    /**
     * The data needed to create a Signature.
     */
    data: XOR<SignatureCreateInput, SignatureUncheckedCreateInput>
  }

  /**
   * Signature createMany
   */
  export type SignatureCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Signatures.
     */
    data: SignatureCreateManyInput | SignatureCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Signature update
   */
  export type SignatureUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Signature
     */
    select?: SignatureSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Signature
     */
    omit?: SignatureOmit<ExtArgs> | null
    /**
     * The data needed to update a Signature.
     */
    data: XOR<SignatureUpdateInput, SignatureUncheckedUpdateInput>
    /**
     * Choose, which Signature to update.
     */
    where: SignatureWhereUniqueInput
  }

  /**
   * Signature updateMany
   */
  export type SignatureUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Signatures.
     */
    data: XOR<SignatureUpdateManyMutationInput, SignatureUncheckedUpdateManyInput>
    /**
     * Filter which Signatures to update
     */
    where?: SignatureWhereInput
    /**
     * Limit how many Signatures to update.
     */
    limit?: number
  }

  /**
   * Signature upsert
   */
  export type SignatureUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Signature
     */
    select?: SignatureSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Signature
     */
    omit?: SignatureOmit<ExtArgs> | null
    /**
     * The filter to search for the Signature to update in case it exists.
     */
    where: SignatureWhereUniqueInput
    /**
     * In case the Signature found by the `where` argument doesn't exist, create a new Signature with this data.
     */
    create: XOR<SignatureCreateInput, SignatureUncheckedCreateInput>
    /**
     * In case the Signature was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SignatureUpdateInput, SignatureUncheckedUpdateInput>
  }

  /**
   * Signature delete
   */
  export type SignatureDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Signature
     */
    select?: SignatureSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Signature
     */
    omit?: SignatureOmit<ExtArgs> | null
    /**
     * Filter which Signature to delete.
     */
    where: SignatureWhereUniqueInput
  }

  /**
   * Signature deleteMany
   */
  export type SignatureDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Signatures to delete
     */
    where?: SignatureWhereInput
    /**
     * Limit how many Signatures to delete.
     */
    limit?: number
  }

  /**
   * Signature without action
   */
  export type SignatureDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Signature
     */
    select?: SignatureSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Signature
     */
    omit?: SignatureOmit<ExtArgs> | null
  }


  /**
   * Model Assessment
   */

  export type AggregateAssessment = {
    _count: AssessmentCountAggregateOutputType | null
    _avg: AssessmentAvgAggregateOutputType | null
    _sum: AssessmentSumAggregateOutputType | null
    _min: AssessmentMinAggregateOutputType | null
    _max: AssessmentMaxAggregateOutputType | null
  }

  export type AssessmentAvgAggregateOutputType = {
    id: number | null
  }

  export type AssessmentSumAggregateOutputType = {
    id: number | null
  }

  export type AssessmentMinAggregateOutputType = {
    id: number | null
    meetingRoom: string | null
    gender: string | null
    role: string | null
    comment: string | null
    createdAt: Date | null
  }

  export type AssessmentMaxAggregateOutputType = {
    id: number | null
    meetingRoom: string | null
    gender: string | null
    role: string | null
    comment: string | null
    createdAt: Date | null
  }

  export type AssessmentCountAggregateOutputType = {
    id: number
    meetingRoom: number
    gender: number
    role: number
    responses: number
    comment: number
    createdAt: number
    _all: number
  }


  export type AssessmentAvgAggregateInputType = {
    id?: true
  }

  export type AssessmentSumAggregateInputType = {
    id?: true
  }

  export type AssessmentMinAggregateInputType = {
    id?: true
    meetingRoom?: true
    gender?: true
    role?: true
    comment?: true
    createdAt?: true
  }

  export type AssessmentMaxAggregateInputType = {
    id?: true
    meetingRoom?: true
    gender?: true
    role?: true
    comment?: true
    createdAt?: true
  }

  export type AssessmentCountAggregateInputType = {
    id?: true
    meetingRoom?: true
    gender?: true
    role?: true
    responses?: true
    comment?: true
    createdAt?: true
    _all?: true
  }

  export type AssessmentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Assessment to aggregate.
     */
    where?: AssessmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Assessments to fetch.
     */
    orderBy?: AssessmentOrderByWithRelationInput | AssessmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AssessmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Assessments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Assessments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Assessments
    **/
    _count?: true | AssessmentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AssessmentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AssessmentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AssessmentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AssessmentMaxAggregateInputType
  }

  export type GetAssessmentAggregateType<T extends AssessmentAggregateArgs> = {
        [P in keyof T & keyof AggregateAssessment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAssessment[P]>
      : GetScalarType<T[P], AggregateAssessment[P]>
  }




  export type AssessmentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AssessmentWhereInput
    orderBy?: AssessmentOrderByWithAggregationInput | AssessmentOrderByWithAggregationInput[]
    by: AssessmentScalarFieldEnum[] | AssessmentScalarFieldEnum
    having?: AssessmentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AssessmentCountAggregateInputType | true
    _avg?: AssessmentAvgAggregateInputType
    _sum?: AssessmentSumAggregateInputType
    _min?: AssessmentMinAggregateInputType
    _max?: AssessmentMaxAggregateInputType
  }

  export type AssessmentGroupByOutputType = {
    id: number
    meetingRoom: string | null
    gender: string | null
    role: string | null
    responses: JsonValue
    comment: string | null
    createdAt: Date
    _count: AssessmentCountAggregateOutputType | null
    _avg: AssessmentAvgAggregateOutputType | null
    _sum: AssessmentSumAggregateOutputType | null
    _min: AssessmentMinAggregateOutputType | null
    _max: AssessmentMaxAggregateOutputType | null
  }

  type GetAssessmentGroupByPayload<T extends AssessmentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AssessmentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AssessmentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AssessmentGroupByOutputType[P]>
            : GetScalarType<T[P], AssessmentGroupByOutputType[P]>
        }
      >
    >


  export type AssessmentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    meetingRoom?: boolean
    gender?: boolean
    role?: boolean
    responses?: boolean
    comment?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["assessment"]>



  export type AssessmentSelectScalar = {
    id?: boolean
    meetingRoom?: boolean
    gender?: boolean
    role?: boolean
    responses?: boolean
    comment?: boolean
    createdAt?: boolean
  }

  export type AssessmentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "meetingRoom" | "gender" | "role" | "responses" | "comment" | "createdAt", ExtArgs["result"]["assessment"]>

  export type $AssessmentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Assessment"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      meetingRoom: string | null
      gender: string | null
      role: string | null
      responses: Prisma.JsonValue
      comment: string | null
      createdAt: Date
    }, ExtArgs["result"]["assessment"]>
    composites: {}
  }

  type AssessmentGetPayload<S extends boolean | null | undefined | AssessmentDefaultArgs> = $Result.GetResult<Prisma.$AssessmentPayload, S>

  type AssessmentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AssessmentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AssessmentCountAggregateInputType | true
    }

  export interface AssessmentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Assessment'], meta: { name: 'Assessment' } }
    /**
     * Find zero or one Assessment that matches the filter.
     * @param {AssessmentFindUniqueArgs} args - Arguments to find a Assessment
     * @example
     * // Get one Assessment
     * const assessment = await prisma.assessment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AssessmentFindUniqueArgs>(args: SelectSubset<T, AssessmentFindUniqueArgs<ExtArgs>>): Prisma__AssessmentClient<$Result.GetResult<Prisma.$AssessmentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Assessment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AssessmentFindUniqueOrThrowArgs} args - Arguments to find a Assessment
     * @example
     * // Get one Assessment
     * const assessment = await prisma.assessment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AssessmentFindUniqueOrThrowArgs>(args: SelectSubset<T, AssessmentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AssessmentClient<$Result.GetResult<Prisma.$AssessmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Assessment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssessmentFindFirstArgs} args - Arguments to find a Assessment
     * @example
     * // Get one Assessment
     * const assessment = await prisma.assessment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AssessmentFindFirstArgs>(args?: SelectSubset<T, AssessmentFindFirstArgs<ExtArgs>>): Prisma__AssessmentClient<$Result.GetResult<Prisma.$AssessmentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Assessment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssessmentFindFirstOrThrowArgs} args - Arguments to find a Assessment
     * @example
     * // Get one Assessment
     * const assessment = await prisma.assessment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AssessmentFindFirstOrThrowArgs>(args?: SelectSubset<T, AssessmentFindFirstOrThrowArgs<ExtArgs>>): Prisma__AssessmentClient<$Result.GetResult<Prisma.$AssessmentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Assessments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssessmentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Assessments
     * const assessments = await prisma.assessment.findMany()
     * 
     * // Get first 10 Assessments
     * const assessments = await prisma.assessment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const assessmentWithIdOnly = await prisma.assessment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AssessmentFindManyArgs>(args?: SelectSubset<T, AssessmentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AssessmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Assessment.
     * @param {AssessmentCreateArgs} args - Arguments to create a Assessment.
     * @example
     * // Create one Assessment
     * const Assessment = await prisma.assessment.create({
     *   data: {
     *     // ... data to create a Assessment
     *   }
     * })
     * 
     */
    create<T extends AssessmentCreateArgs>(args: SelectSubset<T, AssessmentCreateArgs<ExtArgs>>): Prisma__AssessmentClient<$Result.GetResult<Prisma.$AssessmentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Assessments.
     * @param {AssessmentCreateManyArgs} args - Arguments to create many Assessments.
     * @example
     * // Create many Assessments
     * const assessment = await prisma.assessment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AssessmentCreateManyArgs>(args?: SelectSubset<T, AssessmentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Assessment.
     * @param {AssessmentDeleteArgs} args - Arguments to delete one Assessment.
     * @example
     * // Delete one Assessment
     * const Assessment = await prisma.assessment.delete({
     *   where: {
     *     // ... filter to delete one Assessment
     *   }
     * })
     * 
     */
    delete<T extends AssessmentDeleteArgs>(args: SelectSubset<T, AssessmentDeleteArgs<ExtArgs>>): Prisma__AssessmentClient<$Result.GetResult<Prisma.$AssessmentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Assessment.
     * @param {AssessmentUpdateArgs} args - Arguments to update one Assessment.
     * @example
     * // Update one Assessment
     * const assessment = await prisma.assessment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AssessmentUpdateArgs>(args: SelectSubset<T, AssessmentUpdateArgs<ExtArgs>>): Prisma__AssessmentClient<$Result.GetResult<Prisma.$AssessmentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Assessments.
     * @param {AssessmentDeleteManyArgs} args - Arguments to filter Assessments to delete.
     * @example
     * // Delete a few Assessments
     * const { count } = await prisma.assessment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AssessmentDeleteManyArgs>(args?: SelectSubset<T, AssessmentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Assessments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssessmentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Assessments
     * const assessment = await prisma.assessment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AssessmentUpdateManyArgs>(args: SelectSubset<T, AssessmentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Assessment.
     * @param {AssessmentUpsertArgs} args - Arguments to update or create a Assessment.
     * @example
     * // Update or create a Assessment
     * const assessment = await prisma.assessment.upsert({
     *   create: {
     *     // ... data to create a Assessment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Assessment we want to update
     *   }
     * })
     */
    upsert<T extends AssessmentUpsertArgs>(args: SelectSubset<T, AssessmentUpsertArgs<ExtArgs>>): Prisma__AssessmentClient<$Result.GetResult<Prisma.$AssessmentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Assessments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssessmentCountArgs} args - Arguments to filter Assessments to count.
     * @example
     * // Count the number of Assessments
     * const count = await prisma.assessment.count({
     *   where: {
     *     // ... the filter for the Assessments we want to count
     *   }
     * })
    **/
    count<T extends AssessmentCountArgs>(
      args?: Subset<T, AssessmentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AssessmentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Assessment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssessmentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AssessmentAggregateArgs>(args: Subset<T, AssessmentAggregateArgs>): Prisma.PrismaPromise<GetAssessmentAggregateType<T>>

    /**
     * Group by Assessment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssessmentGroupByArgs} args - Group by arguments.
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
      T extends AssessmentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AssessmentGroupByArgs['orderBy'] }
        : { orderBy?: AssessmentGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AssessmentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAssessmentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Assessment model
   */
  readonly fields: AssessmentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Assessment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AssessmentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the Assessment model
   */
  interface AssessmentFieldRefs {
    readonly id: FieldRef<"Assessment", 'Int'>
    readonly meetingRoom: FieldRef<"Assessment", 'String'>
    readonly gender: FieldRef<"Assessment", 'String'>
    readonly role: FieldRef<"Assessment", 'String'>
    readonly responses: FieldRef<"Assessment", 'Json'>
    readonly comment: FieldRef<"Assessment", 'String'>
    readonly createdAt: FieldRef<"Assessment", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Assessment findUnique
   */
  export type AssessmentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assessment
     */
    select?: AssessmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Assessment
     */
    omit?: AssessmentOmit<ExtArgs> | null
    /**
     * Filter, which Assessment to fetch.
     */
    where: AssessmentWhereUniqueInput
  }

  /**
   * Assessment findUniqueOrThrow
   */
  export type AssessmentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assessment
     */
    select?: AssessmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Assessment
     */
    omit?: AssessmentOmit<ExtArgs> | null
    /**
     * Filter, which Assessment to fetch.
     */
    where: AssessmentWhereUniqueInput
  }

  /**
   * Assessment findFirst
   */
  export type AssessmentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assessment
     */
    select?: AssessmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Assessment
     */
    omit?: AssessmentOmit<ExtArgs> | null
    /**
     * Filter, which Assessment to fetch.
     */
    where?: AssessmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Assessments to fetch.
     */
    orderBy?: AssessmentOrderByWithRelationInput | AssessmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Assessments.
     */
    cursor?: AssessmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Assessments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Assessments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Assessments.
     */
    distinct?: AssessmentScalarFieldEnum | AssessmentScalarFieldEnum[]
  }

  /**
   * Assessment findFirstOrThrow
   */
  export type AssessmentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assessment
     */
    select?: AssessmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Assessment
     */
    omit?: AssessmentOmit<ExtArgs> | null
    /**
     * Filter, which Assessment to fetch.
     */
    where?: AssessmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Assessments to fetch.
     */
    orderBy?: AssessmentOrderByWithRelationInput | AssessmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Assessments.
     */
    cursor?: AssessmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Assessments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Assessments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Assessments.
     */
    distinct?: AssessmentScalarFieldEnum | AssessmentScalarFieldEnum[]
  }

  /**
   * Assessment findMany
   */
  export type AssessmentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assessment
     */
    select?: AssessmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Assessment
     */
    omit?: AssessmentOmit<ExtArgs> | null
    /**
     * Filter, which Assessments to fetch.
     */
    where?: AssessmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Assessments to fetch.
     */
    orderBy?: AssessmentOrderByWithRelationInput | AssessmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Assessments.
     */
    cursor?: AssessmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Assessments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Assessments.
     */
    skip?: number
    distinct?: AssessmentScalarFieldEnum | AssessmentScalarFieldEnum[]
  }

  /**
   * Assessment create
   */
  export type AssessmentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assessment
     */
    select?: AssessmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Assessment
     */
    omit?: AssessmentOmit<ExtArgs> | null
    /**
     * The data needed to create a Assessment.
     */
    data: XOR<AssessmentCreateInput, AssessmentUncheckedCreateInput>
  }

  /**
   * Assessment createMany
   */
  export type AssessmentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Assessments.
     */
    data: AssessmentCreateManyInput | AssessmentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Assessment update
   */
  export type AssessmentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assessment
     */
    select?: AssessmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Assessment
     */
    omit?: AssessmentOmit<ExtArgs> | null
    /**
     * The data needed to update a Assessment.
     */
    data: XOR<AssessmentUpdateInput, AssessmentUncheckedUpdateInput>
    /**
     * Choose, which Assessment to update.
     */
    where: AssessmentWhereUniqueInput
  }

  /**
   * Assessment updateMany
   */
  export type AssessmentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Assessments.
     */
    data: XOR<AssessmentUpdateManyMutationInput, AssessmentUncheckedUpdateManyInput>
    /**
     * Filter which Assessments to update
     */
    where?: AssessmentWhereInput
    /**
     * Limit how many Assessments to update.
     */
    limit?: number
  }

  /**
   * Assessment upsert
   */
  export type AssessmentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assessment
     */
    select?: AssessmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Assessment
     */
    omit?: AssessmentOmit<ExtArgs> | null
    /**
     * The filter to search for the Assessment to update in case it exists.
     */
    where: AssessmentWhereUniqueInput
    /**
     * In case the Assessment found by the `where` argument doesn't exist, create a new Assessment with this data.
     */
    create: XOR<AssessmentCreateInput, AssessmentUncheckedCreateInput>
    /**
     * In case the Assessment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AssessmentUpdateInput, AssessmentUncheckedUpdateInput>
  }

  /**
   * Assessment delete
   */
  export type AssessmentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assessment
     */
    select?: AssessmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Assessment
     */
    omit?: AssessmentOmit<ExtArgs> | null
    /**
     * Filter which Assessment to delete.
     */
    where: AssessmentWhereUniqueInput
  }

  /**
   * Assessment deleteMany
   */
  export type AssessmentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Assessments to delete
     */
    where?: AssessmentWhereInput
    /**
     * Limit how many Assessments to delete.
     */
    limit?: number
  }

  /**
   * Assessment without action
   */
  export type AssessmentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assessment
     */
    select?: AssessmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Assessment
     */
    omit?: AssessmentOmit<ExtArgs> | null
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


  export const BookingInfoScalarFieldEnum: {
    bookingID: 'bookingID',
    RoomName: 'RoomName',
    sendDate: 'sendDate',
    sender: 'sender',
    senderEmail: 'senderEmail',
    phoneIn: 'phoneIn',
    phoneOut: 'phoneOut',
    jobName: 'jobName',
    officeLocation: 'officeLocation',
    purpose: 'purpose',
    startDate: 'startDate',
    endDate: 'endDate',
    capacity: 'capacity',
    cfSender: 'cfSender',
    cfPhone: 'cfPhone',
    SendStatus: 'SendStatus',
    approvedNumber: 'approvedNumber',
    RejectReason: 'RejectReason',
    CancelReason: 'CancelReason',
    clearStatus: 'clearStatus',
    damageAction: 'damageAction',
    remark: 'remark',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    RecordStatus: 'RecordStatus',
    calendarEventId: 'calendarEventId'
  };

  export type BookingInfoScalarFieldEnum = (typeof BookingInfoScalarFieldEnum)[keyof typeof BookingInfoScalarFieldEnum]


  export const RoomUsageStatsScalarFieldEnum: {
    id: 'id',
    RoomName: 'RoomName',
    totalUsage: 'totalUsage',
    totalWorkHours: 'totalWorkHours',
    updatedAt: 'updatedAt'
  };

  export type RoomUsageStatsScalarFieldEnum = (typeof RoomUsageStatsScalarFieldEnum)[keyof typeof RoomUsageStatsScalarFieldEnum]


  export const SignatureScalarFieldEnum: {
    id: 'id',
    userEmail: 'userEmail',
    fileName: 'fileName'
  };

  export type SignatureScalarFieldEnum = (typeof SignatureScalarFieldEnum)[keyof typeof SignatureScalarFieldEnum]


  export const AssessmentScalarFieldEnum: {
    id: 'id',
    meetingRoom: 'meetingRoom',
    gender: 'gender',
    role: 'role',
    responses: 'responses',
    comment: 'comment',
    createdAt: 'createdAt'
  };

  export type AssessmentScalarFieldEnum = (typeof AssessmentScalarFieldEnum)[keyof typeof AssessmentScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const BookingInfoOrderByRelevanceFieldEnum: {
    RoomName: 'RoomName',
    sender: 'sender',
    senderEmail: 'senderEmail',
    phoneIn: 'phoneIn',
    phoneOut: 'phoneOut',
    jobName: 'jobName',
    officeLocation: 'officeLocation',
    purpose: 'purpose',
    cfSender: 'cfSender',
    cfPhone: 'cfPhone',
    SendStatus: 'SendStatus',
    approvedNumber: 'approvedNumber',
    RejectReason: 'RejectReason',
    CancelReason: 'CancelReason',
    clearStatus: 'clearStatus',
    damageAction: 'damageAction',
    remark: 'remark',
    RecordStatus: 'RecordStatus',
    calendarEventId: 'calendarEventId'
  };

  export type BookingInfoOrderByRelevanceFieldEnum = (typeof BookingInfoOrderByRelevanceFieldEnum)[keyof typeof BookingInfoOrderByRelevanceFieldEnum]


  export const RoomUsageStatsOrderByRelevanceFieldEnum: {
    RoomName: 'RoomName'
  };

  export type RoomUsageStatsOrderByRelevanceFieldEnum = (typeof RoomUsageStatsOrderByRelevanceFieldEnum)[keyof typeof RoomUsageStatsOrderByRelevanceFieldEnum]


  export const SignatureOrderByRelevanceFieldEnum: {
    userEmail: 'userEmail',
    fileName: 'fileName'
  };

  export type SignatureOrderByRelevanceFieldEnum = (typeof SignatureOrderByRelevanceFieldEnum)[keyof typeof SignatureOrderByRelevanceFieldEnum]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const AssessmentOrderByRelevanceFieldEnum: {
    meetingRoom: 'meetingRoom',
    gender: 'gender',
    role: 'role',
    comment: 'comment'
  };

  export type AssessmentOrderByRelevanceFieldEnum = (typeof AssessmentOrderByRelevanceFieldEnum)[keyof typeof AssessmentOrderByRelevanceFieldEnum]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type BookingInfoWhereInput = {
    AND?: BookingInfoWhereInput | BookingInfoWhereInput[]
    OR?: BookingInfoWhereInput[]
    NOT?: BookingInfoWhereInput | BookingInfoWhereInput[]
    bookingID?: IntFilter<"BookingInfo"> | number
    RoomName?: StringNullableFilter<"BookingInfo"> | string | null
    sendDate?: DateTimeNullableFilter<"BookingInfo"> | Date | string | null
    sender?: StringNullableFilter<"BookingInfo"> | string | null
    senderEmail?: StringNullableFilter<"BookingInfo"> | string | null
    phoneIn?: StringNullableFilter<"BookingInfo"> | string | null
    phoneOut?: StringNullableFilter<"BookingInfo"> | string | null
    jobName?: StringNullableFilter<"BookingInfo"> | string | null
    officeLocation?: StringNullableFilter<"BookingInfo"> | string | null
    purpose?: StringNullableFilter<"BookingInfo"> | string | null
    startDate?: DateTimeNullableFilter<"BookingInfo"> | Date | string | null
    endDate?: DateTimeNullableFilter<"BookingInfo"> | Date | string | null
    capacity?: IntNullableFilter<"BookingInfo"> | number | null
    cfSender?: StringNullableFilter<"BookingInfo"> | string | null
    cfPhone?: StringNullableFilter<"BookingInfo"> | string | null
    SendStatus?: StringNullableFilter<"BookingInfo"> | string | null
    approvedNumber?: StringNullableFilter<"BookingInfo"> | string | null
    RejectReason?: StringNullableFilter<"BookingInfo"> | string | null
    CancelReason?: StringNullableFilter<"BookingInfo"> | string | null
    clearStatus?: StringNullableFilter<"BookingInfo"> | string | null
    damageAction?: StringNullableFilter<"BookingInfo"> | string | null
    remark?: StringNullableFilter<"BookingInfo"> | string | null
    createdAt?: DateTimeNullableFilter<"BookingInfo"> | Date | string | null
    updatedAt?: DateTimeNullableFilter<"BookingInfo"> | Date | string | null
    RecordStatus?: StringNullableFilter<"BookingInfo"> | string | null
    calendarEventId?: StringNullableFilter<"BookingInfo"> | string | null
  }

  export type BookingInfoOrderByWithRelationInput = {
    bookingID?: SortOrder
    RoomName?: SortOrderInput | SortOrder
    sendDate?: SortOrderInput | SortOrder
    sender?: SortOrderInput | SortOrder
    senderEmail?: SortOrderInput | SortOrder
    phoneIn?: SortOrderInput | SortOrder
    phoneOut?: SortOrderInput | SortOrder
    jobName?: SortOrderInput | SortOrder
    officeLocation?: SortOrderInput | SortOrder
    purpose?: SortOrderInput | SortOrder
    startDate?: SortOrderInput | SortOrder
    endDate?: SortOrderInput | SortOrder
    capacity?: SortOrderInput | SortOrder
    cfSender?: SortOrderInput | SortOrder
    cfPhone?: SortOrderInput | SortOrder
    SendStatus?: SortOrderInput | SortOrder
    approvedNumber?: SortOrderInput | SortOrder
    RejectReason?: SortOrderInput | SortOrder
    CancelReason?: SortOrderInput | SortOrder
    clearStatus?: SortOrderInput | SortOrder
    damageAction?: SortOrderInput | SortOrder
    remark?: SortOrderInput | SortOrder
    createdAt?: SortOrderInput | SortOrder
    updatedAt?: SortOrderInput | SortOrder
    RecordStatus?: SortOrderInput | SortOrder
    calendarEventId?: SortOrderInput | SortOrder
    _relevance?: BookingInfoOrderByRelevanceInput
  }

  export type BookingInfoWhereUniqueInput = Prisma.AtLeast<{
    bookingID?: number
    AND?: BookingInfoWhereInput | BookingInfoWhereInput[]
    OR?: BookingInfoWhereInput[]
    NOT?: BookingInfoWhereInput | BookingInfoWhereInput[]
    RoomName?: StringNullableFilter<"BookingInfo"> | string | null
    sendDate?: DateTimeNullableFilter<"BookingInfo"> | Date | string | null
    sender?: StringNullableFilter<"BookingInfo"> | string | null
    senderEmail?: StringNullableFilter<"BookingInfo"> | string | null
    phoneIn?: StringNullableFilter<"BookingInfo"> | string | null
    phoneOut?: StringNullableFilter<"BookingInfo"> | string | null
    jobName?: StringNullableFilter<"BookingInfo"> | string | null
    officeLocation?: StringNullableFilter<"BookingInfo"> | string | null
    purpose?: StringNullableFilter<"BookingInfo"> | string | null
    startDate?: DateTimeNullableFilter<"BookingInfo"> | Date | string | null
    endDate?: DateTimeNullableFilter<"BookingInfo"> | Date | string | null
    capacity?: IntNullableFilter<"BookingInfo"> | number | null
    cfSender?: StringNullableFilter<"BookingInfo"> | string | null
    cfPhone?: StringNullableFilter<"BookingInfo"> | string | null
    SendStatus?: StringNullableFilter<"BookingInfo"> | string | null
    approvedNumber?: StringNullableFilter<"BookingInfo"> | string | null
    RejectReason?: StringNullableFilter<"BookingInfo"> | string | null
    CancelReason?: StringNullableFilter<"BookingInfo"> | string | null
    clearStatus?: StringNullableFilter<"BookingInfo"> | string | null
    damageAction?: StringNullableFilter<"BookingInfo"> | string | null
    remark?: StringNullableFilter<"BookingInfo"> | string | null
    createdAt?: DateTimeNullableFilter<"BookingInfo"> | Date | string | null
    updatedAt?: DateTimeNullableFilter<"BookingInfo"> | Date | string | null
    RecordStatus?: StringNullableFilter<"BookingInfo"> | string | null
    calendarEventId?: StringNullableFilter<"BookingInfo"> | string | null
  }, "bookingID">

  export type BookingInfoOrderByWithAggregationInput = {
    bookingID?: SortOrder
    RoomName?: SortOrderInput | SortOrder
    sendDate?: SortOrderInput | SortOrder
    sender?: SortOrderInput | SortOrder
    senderEmail?: SortOrderInput | SortOrder
    phoneIn?: SortOrderInput | SortOrder
    phoneOut?: SortOrderInput | SortOrder
    jobName?: SortOrderInput | SortOrder
    officeLocation?: SortOrderInput | SortOrder
    purpose?: SortOrderInput | SortOrder
    startDate?: SortOrderInput | SortOrder
    endDate?: SortOrderInput | SortOrder
    capacity?: SortOrderInput | SortOrder
    cfSender?: SortOrderInput | SortOrder
    cfPhone?: SortOrderInput | SortOrder
    SendStatus?: SortOrderInput | SortOrder
    approvedNumber?: SortOrderInput | SortOrder
    RejectReason?: SortOrderInput | SortOrder
    CancelReason?: SortOrderInput | SortOrder
    clearStatus?: SortOrderInput | SortOrder
    damageAction?: SortOrderInput | SortOrder
    remark?: SortOrderInput | SortOrder
    createdAt?: SortOrderInput | SortOrder
    updatedAt?: SortOrderInput | SortOrder
    RecordStatus?: SortOrderInput | SortOrder
    calendarEventId?: SortOrderInput | SortOrder
    _count?: BookingInfoCountOrderByAggregateInput
    _avg?: BookingInfoAvgOrderByAggregateInput
    _max?: BookingInfoMaxOrderByAggregateInput
    _min?: BookingInfoMinOrderByAggregateInput
    _sum?: BookingInfoSumOrderByAggregateInput
  }

  export type BookingInfoScalarWhereWithAggregatesInput = {
    AND?: BookingInfoScalarWhereWithAggregatesInput | BookingInfoScalarWhereWithAggregatesInput[]
    OR?: BookingInfoScalarWhereWithAggregatesInput[]
    NOT?: BookingInfoScalarWhereWithAggregatesInput | BookingInfoScalarWhereWithAggregatesInput[]
    bookingID?: IntWithAggregatesFilter<"BookingInfo"> | number
    RoomName?: StringNullableWithAggregatesFilter<"BookingInfo"> | string | null
    sendDate?: DateTimeNullableWithAggregatesFilter<"BookingInfo"> | Date | string | null
    sender?: StringNullableWithAggregatesFilter<"BookingInfo"> | string | null
    senderEmail?: StringNullableWithAggregatesFilter<"BookingInfo"> | string | null
    phoneIn?: StringNullableWithAggregatesFilter<"BookingInfo"> | string | null
    phoneOut?: StringNullableWithAggregatesFilter<"BookingInfo"> | string | null
    jobName?: StringNullableWithAggregatesFilter<"BookingInfo"> | string | null
    officeLocation?: StringNullableWithAggregatesFilter<"BookingInfo"> | string | null
    purpose?: StringNullableWithAggregatesFilter<"BookingInfo"> | string | null
    startDate?: DateTimeNullableWithAggregatesFilter<"BookingInfo"> | Date | string | null
    endDate?: DateTimeNullableWithAggregatesFilter<"BookingInfo"> | Date | string | null
    capacity?: IntNullableWithAggregatesFilter<"BookingInfo"> | number | null
    cfSender?: StringNullableWithAggregatesFilter<"BookingInfo"> | string | null
    cfPhone?: StringNullableWithAggregatesFilter<"BookingInfo"> | string | null
    SendStatus?: StringNullableWithAggregatesFilter<"BookingInfo"> | string | null
    approvedNumber?: StringNullableWithAggregatesFilter<"BookingInfo"> | string | null
    RejectReason?: StringNullableWithAggregatesFilter<"BookingInfo"> | string | null
    CancelReason?: StringNullableWithAggregatesFilter<"BookingInfo"> | string | null
    clearStatus?: StringNullableWithAggregatesFilter<"BookingInfo"> | string | null
    damageAction?: StringNullableWithAggregatesFilter<"BookingInfo"> | string | null
    remark?: StringNullableWithAggregatesFilter<"BookingInfo"> | string | null
    createdAt?: DateTimeNullableWithAggregatesFilter<"BookingInfo"> | Date | string | null
    updatedAt?: DateTimeNullableWithAggregatesFilter<"BookingInfo"> | Date | string | null
    RecordStatus?: StringNullableWithAggregatesFilter<"BookingInfo"> | string | null
    calendarEventId?: StringNullableWithAggregatesFilter<"BookingInfo"> | string | null
  }

  export type RoomUsageStatsWhereInput = {
    AND?: RoomUsageStatsWhereInput | RoomUsageStatsWhereInput[]
    OR?: RoomUsageStatsWhereInput[]
    NOT?: RoomUsageStatsWhereInput | RoomUsageStatsWhereInput[]
    id?: IntFilter<"RoomUsageStats"> | number
    RoomName?: StringFilter<"RoomUsageStats"> | string
    totalUsage?: IntFilter<"RoomUsageStats"> | number
    totalWorkHours?: IntFilter<"RoomUsageStats"> | number
    updatedAt?: DateTimeFilter<"RoomUsageStats"> | Date | string
  }

  export type RoomUsageStatsOrderByWithRelationInput = {
    id?: SortOrder
    RoomName?: SortOrder
    totalUsage?: SortOrder
    totalWorkHours?: SortOrder
    updatedAt?: SortOrder
    _relevance?: RoomUsageStatsOrderByRelevanceInput
  }

  export type RoomUsageStatsWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    RoomName?: string
    AND?: RoomUsageStatsWhereInput | RoomUsageStatsWhereInput[]
    OR?: RoomUsageStatsWhereInput[]
    NOT?: RoomUsageStatsWhereInput | RoomUsageStatsWhereInput[]
    totalUsage?: IntFilter<"RoomUsageStats"> | number
    totalWorkHours?: IntFilter<"RoomUsageStats"> | number
    updatedAt?: DateTimeFilter<"RoomUsageStats"> | Date | string
  }, "id" | "RoomName">

  export type RoomUsageStatsOrderByWithAggregationInput = {
    id?: SortOrder
    RoomName?: SortOrder
    totalUsage?: SortOrder
    totalWorkHours?: SortOrder
    updatedAt?: SortOrder
    _count?: RoomUsageStatsCountOrderByAggregateInput
    _avg?: RoomUsageStatsAvgOrderByAggregateInput
    _max?: RoomUsageStatsMaxOrderByAggregateInput
    _min?: RoomUsageStatsMinOrderByAggregateInput
    _sum?: RoomUsageStatsSumOrderByAggregateInput
  }

  export type RoomUsageStatsScalarWhereWithAggregatesInput = {
    AND?: RoomUsageStatsScalarWhereWithAggregatesInput | RoomUsageStatsScalarWhereWithAggregatesInput[]
    OR?: RoomUsageStatsScalarWhereWithAggregatesInput[]
    NOT?: RoomUsageStatsScalarWhereWithAggregatesInput | RoomUsageStatsScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"RoomUsageStats"> | number
    RoomName?: StringWithAggregatesFilter<"RoomUsageStats"> | string
    totalUsage?: IntWithAggregatesFilter<"RoomUsageStats"> | number
    totalWorkHours?: IntWithAggregatesFilter<"RoomUsageStats"> | number
    updatedAt?: DateTimeWithAggregatesFilter<"RoomUsageStats"> | Date | string
  }

  export type SignatureWhereInput = {
    AND?: SignatureWhereInput | SignatureWhereInput[]
    OR?: SignatureWhereInput[]
    NOT?: SignatureWhereInput | SignatureWhereInput[]
    id?: IntFilter<"Signature"> | number
    userEmail?: StringFilter<"Signature"> | string
    fileName?: StringFilter<"Signature"> | string
  }

  export type SignatureOrderByWithRelationInput = {
    id?: SortOrder
    userEmail?: SortOrder
    fileName?: SortOrder
    _relevance?: SignatureOrderByRelevanceInput
  }

  export type SignatureWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    userEmail?: string
    AND?: SignatureWhereInput | SignatureWhereInput[]
    OR?: SignatureWhereInput[]
    NOT?: SignatureWhereInput | SignatureWhereInput[]
    fileName?: StringFilter<"Signature"> | string
  }, "id" | "userEmail">

  export type SignatureOrderByWithAggregationInput = {
    id?: SortOrder
    userEmail?: SortOrder
    fileName?: SortOrder
    _count?: SignatureCountOrderByAggregateInput
    _avg?: SignatureAvgOrderByAggregateInput
    _max?: SignatureMaxOrderByAggregateInput
    _min?: SignatureMinOrderByAggregateInput
    _sum?: SignatureSumOrderByAggregateInput
  }

  export type SignatureScalarWhereWithAggregatesInput = {
    AND?: SignatureScalarWhereWithAggregatesInput | SignatureScalarWhereWithAggregatesInput[]
    OR?: SignatureScalarWhereWithAggregatesInput[]
    NOT?: SignatureScalarWhereWithAggregatesInput | SignatureScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Signature"> | number
    userEmail?: StringWithAggregatesFilter<"Signature"> | string
    fileName?: StringWithAggregatesFilter<"Signature"> | string
  }

  export type AssessmentWhereInput = {
    AND?: AssessmentWhereInput | AssessmentWhereInput[]
    OR?: AssessmentWhereInput[]
    NOT?: AssessmentWhereInput | AssessmentWhereInput[]
    id?: IntFilter<"Assessment"> | number
    meetingRoom?: StringNullableFilter<"Assessment"> | string | null
    gender?: StringNullableFilter<"Assessment"> | string | null
    role?: StringNullableFilter<"Assessment"> | string | null
    responses?: JsonFilter<"Assessment">
    comment?: StringNullableFilter<"Assessment"> | string | null
    createdAt?: DateTimeFilter<"Assessment"> | Date | string
  }

  export type AssessmentOrderByWithRelationInput = {
    id?: SortOrder
    meetingRoom?: SortOrderInput | SortOrder
    gender?: SortOrderInput | SortOrder
    role?: SortOrderInput | SortOrder
    responses?: SortOrder
    comment?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _relevance?: AssessmentOrderByRelevanceInput
  }

  export type AssessmentWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: AssessmentWhereInput | AssessmentWhereInput[]
    OR?: AssessmentWhereInput[]
    NOT?: AssessmentWhereInput | AssessmentWhereInput[]
    meetingRoom?: StringNullableFilter<"Assessment"> | string | null
    gender?: StringNullableFilter<"Assessment"> | string | null
    role?: StringNullableFilter<"Assessment"> | string | null
    responses?: JsonFilter<"Assessment">
    comment?: StringNullableFilter<"Assessment"> | string | null
    createdAt?: DateTimeFilter<"Assessment"> | Date | string
  }, "id">

  export type AssessmentOrderByWithAggregationInput = {
    id?: SortOrder
    meetingRoom?: SortOrderInput | SortOrder
    gender?: SortOrderInput | SortOrder
    role?: SortOrderInput | SortOrder
    responses?: SortOrder
    comment?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: AssessmentCountOrderByAggregateInput
    _avg?: AssessmentAvgOrderByAggregateInput
    _max?: AssessmentMaxOrderByAggregateInput
    _min?: AssessmentMinOrderByAggregateInput
    _sum?: AssessmentSumOrderByAggregateInput
  }

  export type AssessmentScalarWhereWithAggregatesInput = {
    AND?: AssessmentScalarWhereWithAggregatesInput | AssessmentScalarWhereWithAggregatesInput[]
    OR?: AssessmentScalarWhereWithAggregatesInput[]
    NOT?: AssessmentScalarWhereWithAggregatesInput | AssessmentScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Assessment"> | number
    meetingRoom?: StringNullableWithAggregatesFilter<"Assessment"> | string | null
    gender?: StringNullableWithAggregatesFilter<"Assessment"> | string | null
    role?: StringNullableWithAggregatesFilter<"Assessment"> | string | null
    responses?: JsonWithAggregatesFilter<"Assessment">
    comment?: StringNullableWithAggregatesFilter<"Assessment"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Assessment"> | Date | string
  }

  export type BookingInfoCreateInput = {
    RoomName?: string | null
    sendDate?: Date | string | null
    sender?: string | null
    senderEmail?: string | null
    phoneIn?: string | null
    phoneOut?: string | null
    jobName?: string | null
    officeLocation?: string | null
    purpose?: string | null
    startDate?: Date | string | null
    endDate?: Date | string | null
    capacity?: number | null
    cfSender?: string | null
    cfPhone?: string | null
    SendStatus?: string | null
    approvedNumber?: string | null
    RejectReason?: string | null
    CancelReason?: string | null
    clearStatus?: string | null
    damageAction?: string | null
    remark?: string | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    RecordStatus?: string | null
    calendarEventId?: string | null
  }

  export type BookingInfoUncheckedCreateInput = {
    bookingID?: number
    RoomName?: string | null
    sendDate?: Date | string | null
    sender?: string | null
    senderEmail?: string | null
    phoneIn?: string | null
    phoneOut?: string | null
    jobName?: string | null
    officeLocation?: string | null
    purpose?: string | null
    startDate?: Date | string | null
    endDate?: Date | string | null
    capacity?: number | null
    cfSender?: string | null
    cfPhone?: string | null
    SendStatus?: string | null
    approvedNumber?: string | null
    RejectReason?: string | null
    CancelReason?: string | null
    clearStatus?: string | null
    damageAction?: string | null
    remark?: string | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    RecordStatus?: string | null
    calendarEventId?: string | null
  }

  export type BookingInfoUpdateInput = {
    RoomName?: NullableStringFieldUpdateOperationsInput | string | null
    sendDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    sender?: NullableStringFieldUpdateOperationsInput | string | null
    senderEmail?: NullableStringFieldUpdateOperationsInput | string | null
    phoneIn?: NullableStringFieldUpdateOperationsInput | string | null
    phoneOut?: NullableStringFieldUpdateOperationsInput | string | null
    jobName?: NullableStringFieldUpdateOperationsInput | string | null
    officeLocation?: NullableStringFieldUpdateOperationsInput | string | null
    purpose?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    capacity?: NullableIntFieldUpdateOperationsInput | number | null
    cfSender?: NullableStringFieldUpdateOperationsInput | string | null
    cfPhone?: NullableStringFieldUpdateOperationsInput | string | null
    SendStatus?: NullableStringFieldUpdateOperationsInput | string | null
    approvedNumber?: NullableStringFieldUpdateOperationsInput | string | null
    RejectReason?: NullableStringFieldUpdateOperationsInput | string | null
    CancelReason?: NullableStringFieldUpdateOperationsInput | string | null
    clearStatus?: NullableStringFieldUpdateOperationsInput | string | null
    damageAction?: NullableStringFieldUpdateOperationsInput | string | null
    remark?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    RecordStatus?: NullableStringFieldUpdateOperationsInput | string | null
    calendarEventId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type BookingInfoUncheckedUpdateInput = {
    bookingID?: IntFieldUpdateOperationsInput | number
    RoomName?: NullableStringFieldUpdateOperationsInput | string | null
    sendDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    sender?: NullableStringFieldUpdateOperationsInput | string | null
    senderEmail?: NullableStringFieldUpdateOperationsInput | string | null
    phoneIn?: NullableStringFieldUpdateOperationsInput | string | null
    phoneOut?: NullableStringFieldUpdateOperationsInput | string | null
    jobName?: NullableStringFieldUpdateOperationsInput | string | null
    officeLocation?: NullableStringFieldUpdateOperationsInput | string | null
    purpose?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    capacity?: NullableIntFieldUpdateOperationsInput | number | null
    cfSender?: NullableStringFieldUpdateOperationsInput | string | null
    cfPhone?: NullableStringFieldUpdateOperationsInput | string | null
    SendStatus?: NullableStringFieldUpdateOperationsInput | string | null
    approvedNumber?: NullableStringFieldUpdateOperationsInput | string | null
    RejectReason?: NullableStringFieldUpdateOperationsInput | string | null
    CancelReason?: NullableStringFieldUpdateOperationsInput | string | null
    clearStatus?: NullableStringFieldUpdateOperationsInput | string | null
    damageAction?: NullableStringFieldUpdateOperationsInput | string | null
    remark?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    RecordStatus?: NullableStringFieldUpdateOperationsInput | string | null
    calendarEventId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type BookingInfoCreateManyInput = {
    bookingID?: number
    RoomName?: string | null
    sendDate?: Date | string | null
    sender?: string | null
    senderEmail?: string | null
    phoneIn?: string | null
    phoneOut?: string | null
    jobName?: string | null
    officeLocation?: string | null
    purpose?: string | null
    startDate?: Date | string | null
    endDate?: Date | string | null
    capacity?: number | null
    cfSender?: string | null
    cfPhone?: string | null
    SendStatus?: string | null
    approvedNumber?: string | null
    RejectReason?: string | null
    CancelReason?: string | null
    clearStatus?: string | null
    damageAction?: string | null
    remark?: string | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    RecordStatus?: string | null
    calendarEventId?: string | null
  }

  export type BookingInfoUpdateManyMutationInput = {
    RoomName?: NullableStringFieldUpdateOperationsInput | string | null
    sendDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    sender?: NullableStringFieldUpdateOperationsInput | string | null
    senderEmail?: NullableStringFieldUpdateOperationsInput | string | null
    phoneIn?: NullableStringFieldUpdateOperationsInput | string | null
    phoneOut?: NullableStringFieldUpdateOperationsInput | string | null
    jobName?: NullableStringFieldUpdateOperationsInput | string | null
    officeLocation?: NullableStringFieldUpdateOperationsInput | string | null
    purpose?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    capacity?: NullableIntFieldUpdateOperationsInput | number | null
    cfSender?: NullableStringFieldUpdateOperationsInput | string | null
    cfPhone?: NullableStringFieldUpdateOperationsInput | string | null
    SendStatus?: NullableStringFieldUpdateOperationsInput | string | null
    approvedNumber?: NullableStringFieldUpdateOperationsInput | string | null
    RejectReason?: NullableStringFieldUpdateOperationsInput | string | null
    CancelReason?: NullableStringFieldUpdateOperationsInput | string | null
    clearStatus?: NullableStringFieldUpdateOperationsInput | string | null
    damageAction?: NullableStringFieldUpdateOperationsInput | string | null
    remark?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    RecordStatus?: NullableStringFieldUpdateOperationsInput | string | null
    calendarEventId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type BookingInfoUncheckedUpdateManyInput = {
    bookingID?: IntFieldUpdateOperationsInput | number
    RoomName?: NullableStringFieldUpdateOperationsInput | string | null
    sendDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    sender?: NullableStringFieldUpdateOperationsInput | string | null
    senderEmail?: NullableStringFieldUpdateOperationsInput | string | null
    phoneIn?: NullableStringFieldUpdateOperationsInput | string | null
    phoneOut?: NullableStringFieldUpdateOperationsInput | string | null
    jobName?: NullableStringFieldUpdateOperationsInput | string | null
    officeLocation?: NullableStringFieldUpdateOperationsInput | string | null
    purpose?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    capacity?: NullableIntFieldUpdateOperationsInput | number | null
    cfSender?: NullableStringFieldUpdateOperationsInput | string | null
    cfPhone?: NullableStringFieldUpdateOperationsInput | string | null
    SendStatus?: NullableStringFieldUpdateOperationsInput | string | null
    approvedNumber?: NullableStringFieldUpdateOperationsInput | string | null
    RejectReason?: NullableStringFieldUpdateOperationsInput | string | null
    CancelReason?: NullableStringFieldUpdateOperationsInput | string | null
    clearStatus?: NullableStringFieldUpdateOperationsInput | string | null
    damageAction?: NullableStringFieldUpdateOperationsInput | string | null
    remark?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    RecordStatus?: NullableStringFieldUpdateOperationsInput | string | null
    calendarEventId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type RoomUsageStatsCreateInput = {
    RoomName: string
    totalUsage: number
    totalWorkHours: number
    updatedAt?: Date | string
  }

  export type RoomUsageStatsUncheckedCreateInput = {
    id?: number
    RoomName: string
    totalUsage: number
    totalWorkHours: number
    updatedAt?: Date | string
  }

  export type RoomUsageStatsUpdateInput = {
    RoomName?: StringFieldUpdateOperationsInput | string
    totalUsage?: IntFieldUpdateOperationsInput | number
    totalWorkHours?: IntFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoomUsageStatsUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    RoomName?: StringFieldUpdateOperationsInput | string
    totalUsage?: IntFieldUpdateOperationsInput | number
    totalWorkHours?: IntFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoomUsageStatsCreateManyInput = {
    id?: number
    RoomName: string
    totalUsage: number
    totalWorkHours: number
    updatedAt?: Date | string
  }

  export type RoomUsageStatsUpdateManyMutationInput = {
    RoomName?: StringFieldUpdateOperationsInput | string
    totalUsage?: IntFieldUpdateOperationsInput | number
    totalWorkHours?: IntFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoomUsageStatsUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    RoomName?: StringFieldUpdateOperationsInput | string
    totalUsage?: IntFieldUpdateOperationsInput | number
    totalWorkHours?: IntFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SignatureCreateInput = {
    userEmail: string
    fileName: string
  }

  export type SignatureUncheckedCreateInput = {
    id?: number
    userEmail: string
    fileName: string
  }

  export type SignatureUpdateInput = {
    userEmail?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
  }

  export type SignatureUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userEmail?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
  }

  export type SignatureCreateManyInput = {
    id?: number
    userEmail: string
    fileName: string
  }

  export type SignatureUpdateManyMutationInput = {
    userEmail?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
  }

  export type SignatureUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userEmail?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
  }

  export type AssessmentCreateInput = {
    meetingRoom?: string | null
    gender?: string | null
    role?: string | null
    responses: JsonNullValueInput | InputJsonValue
    comment?: string | null
    createdAt?: Date | string
  }

  export type AssessmentUncheckedCreateInput = {
    id?: number
    meetingRoom?: string | null
    gender?: string | null
    role?: string | null
    responses: JsonNullValueInput | InputJsonValue
    comment?: string | null
    createdAt?: Date | string
  }

  export type AssessmentUpdateInput = {
    meetingRoom?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    role?: NullableStringFieldUpdateOperationsInput | string | null
    responses?: JsonNullValueInput | InputJsonValue
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AssessmentUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    meetingRoom?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    role?: NullableStringFieldUpdateOperationsInput | string | null
    responses?: JsonNullValueInput | InputJsonValue
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AssessmentCreateManyInput = {
    id?: number
    meetingRoom?: string | null
    gender?: string | null
    role?: string | null
    responses: JsonNullValueInput | InputJsonValue
    comment?: string | null
    createdAt?: Date | string
  }

  export type AssessmentUpdateManyMutationInput = {
    meetingRoom?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    role?: NullableStringFieldUpdateOperationsInput | string | null
    responses?: JsonNullValueInput | InputJsonValue
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AssessmentUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    meetingRoom?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    role?: NullableStringFieldUpdateOperationsInput | string | null
    responses?: JsonNullValueInput | InputJsonValue
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type BookingInfoOrderByRelevanceInput = {
    fields: BookingInfoOrderByRelevanceFieldEnum | BookingInfoOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type BookingInfoCountOrderByAggregateInput = {
    bookingID?: SortOrder
    RoomName?: SortOrder
    sendDate?: SortOrder
    sender?: SortOrder
    senderEmail?: SortOrder
    phoneIn?: SortOrder
    phoneOut?: SortOrder
    jobName?: SortOrder
    officeLocation?: SortOrder
    purpose?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    capacity?: SortOrder
    cfSender?: SortOrder
    cfPhone?: SortOrder
    SendStatus?: SortOrder
    approvedNumber?: SortOrder
    RejectReason?: SortOrder
    CancelReason?: SortOrder
    clearStatus?: SortOrder
    damageAction?: SortOrder
    remark?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    RecordStatus?: SortOrder
    calendarEventId?: SortOrder
  }

  export type BookingInfoAvgOrderByAggregateInput = {
    bookingID?: SortOrder
    capacity?: SortOrder
  }

  export type BookingInfoMaxOrderByAggregateInput = {
    bookingID?: SortOrder
    RoomName?: SortOrder
    sendDate?: SortOrder
    sender?: SortOrder
    senderEmail?: SortOrder
    phoneIn?: SortOrder
    phoneOut?: SortOrder
    jobName?: SortOrder
    officeLocation?: SortOrder
    purpose?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    capacity?: SortOrder
    cfSender?: SortOrder
    cfPhone?: SortOrder
    SendStatus?: SortOrder
    approvedNumber?: SortOrder
    RejectReason?: SortOrder
    CancelReason?: SortOrder
    clearStatus?: SortOrder
    damageAction?: SortOrder
    remark?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    RecordStatus?: SortOrder
    calendarEventId?: SortOrder
  }

  export type BookingInfoMinOrderByAggregateInput = {
    bookingID?: SortOrder
    RoomName?: SortOrder
    sendDate?: SortOrder
    sender?: SortOrder
    senderEmail?: SortOrder
    phoneIn?: SortOrder
    phoneOut?: SortOrder
    jobName?: SortOrder
    officeLocation?: SortOrder
    purpose?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    capacity?: SortOrder
    cfSender?: SortOrder
    cfPhone?: SortOrder
    SendStatus?: SortOrder
    approvedNumber?: SortOrder
    RejectReason?: SortOrder
    CancelReason?: SortOrder
    clearStatus?: SortOrder
    damageAction?: SortOrder
    remark?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    RecordStatus?: SortOrder
    calendarEventId?: SortOrder
  }

  export type BookingInfoSumOrderByAggregateInput = {
    bookingID?: SortOrder
    capacity?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
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

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
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

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type RoomUsageStatsOrderByRelevanceInput = {
    fields: RoomUsageStatsOrderByRelevanceFieldEnum | RoomUsageStatsOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type RoomUsageStatsCountOrderByAggregateInput = {
    id?: SortOrder
    RoomName?: SortOrder
    totalUsage?: SortOrder
    totalWorkHours?: SortOrder
    updatedAt?: SortOrder
  }

  export type RoomUsageStatsAvgOrderByAggregateInput = {
    id?: SortOrder
    totalUsage?: SortOrder
    totalWorkHours?: SortOrder
  }

  export type RoomUsageStatsMaxOrderByAggregateInput = {
    id?: SortOrder
    RoomName?: SortOrder
    totalUsage?: SortOrder
    totalWorkHours?: SortOrder
    updatedAt?: SortOrder
  }

  export type RoomUsageStatsMinOrderByAggregateInput = {
    id?: SortOrder
    RoomName?: SortOrder
    totalUsage?: SortOrder
    totalWorkHours?: SortOrder
    updatedAt?: SortOrder
  }

  export type RoomUsageStatsSumOrderByAggregateInput = {
    id?: SortOrder
    totalUsage?: SortOrder
    totalWorkHours?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type SignatureOrderByRelevanceInput = {
    fields: SignatureOrderByRelevanceFieldEnum | SignatureOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type SignatureCountOrderByAggregateInput = {
    id?: SortOrder
    userEmail?: SortOrder
    fileName?: SortOrder
  }

  export type SignatureAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type SignatureMaxOrderByAggregateInput = {
    id?: SortOrder
    userEmail?: SortOrder
    fileName?: SortOrder
  }

  export type SignatureMinOrderByAggregateInput = {
    id?: SortOrder
    userEmail?: SortOrder
    fileName?: SortOrder
  }

  export type SignatureSumOrderByAggregateInput = {
    id?: SortOrder
  }
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue
    lte?: InputJsonValue
    gt?: InputJsonValue
    gte?: InputJsonValue
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type AssessmentOrderByRelevanceInput = {
    fields: AssessmentOrderByRelevanceFieldEnum | AssessmentOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type AssessmentCountOrderByAggregateInput = {
    id?: SortOrder
    meetingRoom?: SortOrder
    gender?: SortOrder
    role?: SortOrder
    responses?: SortOrder
    comment?: SortOrder
    createdAt?: SortOrder
  }

  export type AssessmentAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type AssessmentMaxOrderByAggregateInput = {
    id?: SortOrder
    meetingRoom?: SortOrder
    gender?: SortOrder
    role?: SortOrder
    comment?: SortOrder
    createdAt?: SortOrder
  }

  export type AssessmentMinOrderByAggregateInput = {
    id?: SortOrder
    meetingRoom?: SortOrder
    gender?: SortOrder
    role?: SortOrder
    comment?: SortOrder
    createdAt?: SortOrder
  }

  export type AssessmentSumOrderByAggregateInput = {
    id?: SortOrder
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue
    lte?: InputJsonValue
    gt?: InputJsonValue
    gte?: InputJsonValue
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
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
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
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

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue
    lte?: InputJsonValue
    gt?: InputJsonValue
    gte?: InputJsonValue
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