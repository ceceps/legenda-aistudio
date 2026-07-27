
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
 * Model Asset
 * 
 */
export type Asset = $Result.DefaultSelection<Prisma.$AssetPayload>
/**
 * Model AudioAsset
 * 
 */
export type AudioAsset = $Result.DefaultSelection<Prisma.$AudioAssetPayload>
/**
 * Model Job
 * 
 */
export type Job = $Result.DefaultSelection<Prisma.$JobPayload>
/**
 * Model Project
 * 
 */
export type Project = $Result.DefaultSelection<Prisma.$ProjectPayload>
/**
 * Model Scene
 * 
 */
export type Scene = $Result.DefaultSelection<Prisma.$ScenePayload>

/**
 * Enums
 */
export namespace $Enums {
  export const AssetType: {
  CHARACTER: 'CHARACTER',
  ITEM: 'ITEM',
  BACKGROUND: 'BACKGROUND'
};

export type AssetType = (typeof AssetType)[keyof typeof AssetType]


export const AudioType: {
  SOUNDTRACK: 'SOUNDTRACK',
  BACKSOUND: 'BACKSOUND',
  VOICE_OVER: 'VOICE_OVER'
};

export type AudioType = (typeof AudioType)[keyof typeof AudioType]


export const HistoricalEra: {
  SEBELUM_MASEHI: 'SEBELUM_MASEHI',
  MASEHI: 'MASEHI'
};

export type HistoricalEra = (typeof HistoricalEra)[keyof typeof HistoricalEra]


export const JobStatus: {
  PENDING: 'PENDING',
  PROCESSING: 'PROCESSING',
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED'
};

export type JobStatus = (typeof JobStatus)[keyof typeof JobStatus]


export const ProjectStatus: {
  DRAFT: 'DRAFT',
  STORY_GENERATING: 'STORY_GENERATING',
  STORY_DONE: 'STORY_DONE',
  ASSETS_GENERATING: 'ASSETS_GENERATING',
  ASSETS_DONE: 'ASSETS_DONE',
  AUDIO_GENERATING: 'AUDIO_GENERATING',
  AUDIO_DONE: 'AUDIO_DONE',
  STORYBOARD_GENERATING: 'STORYBOARD_GENERATING',
  STORYBOARD_DONE: 'STORYBOARD_DONE',
  VIDEO_GENERATING: 'VIDEO_GENERATING',
  VIDEO_DONE: 'VIDEO_DONE',
  ASSEMBLING: 'ASSEMBLING',
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED'
};

export type ProjectStatus = (typeof ProjectStatus)[keyof typeof ProjectStatus]


export const StoryStyle: {
  KLASIK: 'KLASIK',
  SAAT_INI: 'SAAT_INI',
  FUTURISTIK: 'FUTURISTIK',
  SUPER_HERO: 'SUPER_HERO'
};

export type StoryStyle = (typeof StoryStyle)[keyof typeof StoryStyle]

}

export type AssetType = $Enums.AssetType

export const AssetType: typeof $Enums.AssetType

export type AudioType = $Enums.AudioType

export const AudioType: typeof $Enums.AudioType

export type HistoricalEra = $Enums.HistoricalEra

export const HistoricalEra: typeof $Enums.HistoricalEra

export type JobStatus = $Enums.JobStatus

export const JobStatus: typeof $Enums.JobStatus

export type ProjectStatus = $Enums.ProjectStatus

export const ProjectStatus: typeof $Enums.ProjectStatus

export type StoryStyle = $Enums.StoryStyle

export const StoryStyle: typeof $Enums.StoryStyle

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Assets
 * const assets = await prisma.asset.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
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
   * // Fetch zero or more Assets
   * const assets = await prisma.asset.findMany()
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
   * `prisma.asset`: Exposes CRUD operations for the **Asset** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Assets
    * const assets = await prisma.asset.findMany()
    * ```
    */
  get asset(): Prisma.AssetDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.audioAsset`: Exposes CRUD operations for the **AudioAsset** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AudioAssets
    * const audioAssets = await prisma.audioAsset.findMany()
    * ```
    */
  get audioAsset(): Prisma.AudioAssetDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.job`: Exposes CRUD operations for the **Job** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Jobs
    * const jobs = await prisma.job.findMany()
    * ```
    */
  get job(): Prisma.JobDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.project`: Exposes CRUD operations for the **Project** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Projects
    * const projects = await prisma.project.findMany()
    * ```
    */
  get project(): Prisma.ProjectDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.scene`: Exposes CRUD operations for the **Scene** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Scenes
    * const scenes = await prisma.scene.findMany()
    * ```
    */
  get scene(): Prisma.SceneDelegate<ExtArgs, ClientOptions>;
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
   * Prisma Client JS version: 6.19.3
   * Query Engine version: c2990dca591cba766e3b7ef5d9e8a84796e47ab7
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
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
    Asset: 'Asset',
    AudioAsset: 'AudioAsset',
    Job: 'Job',
    Project: 'Project',
    Scene: 'Scene'
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
      modelProps: "asset" | "audioAsset" | "job" | "project" | "scene"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Asset: {
        payload: Prisma.$AssetPayload<ExtArgs>
        fields: Prisma.AssetFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AssetFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssetPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AssetFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssetPayload>
          }
          findFirst: {
            args: Prisma.AssetFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssetPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AssetFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssetPayload>
          }
          findMany: {
            args: Prisma.AssetFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssetPayload>[]
          }
          create: {
            args: Prisma.AssetCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssetPayload>
          }
          createMany: {
            args: Prisma.AssetCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AssetCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssetPayload>[]
          }
          delete: {
            args: Prisma.AssetDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssetPayload>
          }
          update: {
            args: Prisma.AssetUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssetPayload>
          }
          deleteMany: {
            args: Prisma.AssetDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AssetUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AssetUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssetPayload>[]
          }
          upsert: {
            args: Prisma.AssetUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssetPayload>
          }
          aggregate: {
            args: Prisma.AssetAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAsset>
          }
          groupBy: {
            args: Prisma.AssetGroupByArgs<ExtArgs>
            result: $Utils.Optional<AssetGroupByOutputType>[]
          }
          count: {
            args: Prisma.AssetCountArgs<ExtArgs>
            result: $Utils.Optional<AssetCountAggregateOutputType> | number
          }
        }
      }
      AudioAsset: {
        payload: Prisma.$AudioAssetPayload<ExtArgs>
        fields: Prisma.AudioAssetFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AudioAssetFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AudioAssetPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AudioAssetFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AudioAssetPayload>
          }
          findFirst: {
            args: Prisma.AudioAssetFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AudioAssetPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AudioAssetFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AudioAssetPayload>
          }
          findMany: {
            args: Prisma.AudioAssetFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AudioAssetPayload>[]
          }
          create: {
            args: Prisma.AudioAssetCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AudioAssetPayload>
          }
          createMany: {
            args: Prisma.AudioAssetCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AudioAssetCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AudioAssetPayload>[]
          }
          delete: {
            args: Prisma.AudioAssetDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AudioAssetPayload>
          }
          update: {
            args: Prisma.AudioAssetUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AudioAssetPayload>
          }
          deleteMany: {
            args: Prisma.AudioAssetDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AudioAssetUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AudioAssetUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AudioAssetPayload>[]
          }
          upsert: {
            args: Prisma.AudioAssetUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AudioAssetPayload>
          }
          aggregate: {
            args: Prisma.AudioAssetAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAudioAsset>
          }
          groupBy: {
            args: Prisma.AudioAssetGroupByArgs<ExtArgs>
            result: $Utils.Optional<AudioAssetGroupByOutputType>[]
          }
          count: {
            args: Prisma.AudioAssetCountArgs<ExtArgs>
            result: $Utils.Optional<AudioAssetCountAggregateOutputType> | number
          }
        }
      }
      Job: {
        payload: Prisma.$JobPayload<ExtArgs>
        fields: Prisma.JobFieldRefs
        operations: {
          findUnique: {
            args: Prisma.JobFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.JobFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPayload>
          }
          findFirst: {
            args: Prisma.JobFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.JobFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPayload>
          }
          findMany: {
            args: Prisma.JobFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPayload>[]
          }
          create: {
            args: Prisma.JobCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPayload>
          }
          createMany: {
            args: Prisma.JobCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.JobCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPayload>[]
          }
          delete: {
            args: Prisma.JobDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPayload>
          }
          update: {
            args: Prisma.JobUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPayload>
          }
          deleteMany: {
            args: Prisma.JobDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.JobUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.JobUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPayload>[]
          }
          upsert: {
            args: Prisma.JobUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPayload>
          }
          aggregate: {
            args: Prisma.JobAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateJob>
          }
          groupBy: {
            args: Prisma.JobGroupByArgs<ExtArgs>
            result: $Utils.Optional<JobGroupByOutputType>[]
          }
          count: {
            args: Prisma.JobCountArgs<ExtArgs>
            result: $Utils.Optional<JobCountAggregateOutputType> | number
          }
        }
      }
      Project: {
        payload: Prisma.$ProjectPayload<ExtArgs>
        fields: Prisma.ProjectFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProjectFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProjectFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          findFirst: {
            args: Prisma.ProjectFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProjectFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          findMany: {
            args: Prisma.ProjectFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>[]
          }
          create: {
            args: Prisma.ProjectCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          createMany: {
            args: Prisma.ProjectCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProjectCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>[]
          }
          delete: {
            args: Prisma.ProjectDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          update: {
            args: Prisma.ProjectUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          deleteMany: {
            args: Prisma.ProjectDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProjectUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProjectUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>[]
          }
          upsert: {
            args: Prisma.ProjectUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          aggregate: {
            args: Prisma.ProjectAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProject>
          }
          groupBy: {
            args: Prisma.ProjectGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProjectGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProjectCountArgs<ExtArgs>
            result: $Utils.Optional<ProjectCountAggregateOutputType> | number
          }
        }
      }
      Scene: {
        payload: Prisma.$ScenePayload<ExtArgs>
        fields: Prisma.SceneFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SceneFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScenePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SceneFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScenePayload>
          }
          findFirst: {
            args: Prisma.SceneFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScenePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SceneFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScenePayload>
          }
          findMany: {
            args: Prisma.SceneFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScenePayload>[]
          }
          create: {
            args: Prisma.SceneCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScenePayload>
          }
          createMany: {
            args: Prisma.SceneCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SceneCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScenePayload>[]
          }
          delete: {
            args: Prisma.SceneDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScenePayload>
          }
          update: {
            args: Prisma.SceneUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScenePayload>
          }
          deleteMany: {
            args: Prisma.SceneDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SceneUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SceneUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScenePayload>[]
          }
          upsert: {
            args: Prisma.SceneUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScenePayload>
          }
          aggregate: {
            args: Prisma.SceneAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateScene>
          }
          groupBy: {
            args: Prisma.SceneGroupByArgs<ExtArgs>
            result: $Utils.Optional<SceneGroupByOutputType>[]
          }
          count: {
            args: Prisma.SceneCountArgs<ExtArgs>
            result: $Utils.Optional<SceneCountAggregateOutputType> | number
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
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
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
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
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
    asset?: AssetOmit
    audioAsset?: AudioAssetOmit
    job?: JobOmit
    project?: ProjectOmit
    scene?: SceneOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

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
   * Count Type ProjectCountOutputType
   */

  export type ProjectCountOutputType = {
    Asset: number
    AudioAsset: number
    Job: number
    Scene: number
  }

  export type ProjectCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Asset?: boolean | ProjectCountOutputTypeCountAssetArgs
    AudioAsset?: boolean | ProjectCountOutputTypeCountAudioAssetArgs
    Job?: boolean | ProjectCountOutputTypeCountJobArgs
    Scene?: boolean | ProjectCountOutputTypeCountSceneArgs
  }

  // Custom InputTypes
  /**
   * ProjectCountOutputType without action
   */
  export type ProjectCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectCountOutputType
     */
    select?: ProjectCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProjectCountOutputType without action
   */
  export type ProjectCountOutputTypeCountAssetArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AssetWhereInput
  }

  /**
   * ProjectCountOutputType without action
   */
  export type ProjectCountOutputTypeCountAudioAssetArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AudioAssetWhereInput
  }

  /**
   * ProjectCountOutputType without action
   */
  export type ProjectCountOutputTypeCountJobArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: JobWhereInput
  }

  /**
   * ProjectCountOutputType without action
   */
  export type ProjectCountOutputTypeCountSceneArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SceneWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Asset
   */

  export type AggregateAsset = {
    _count: AssetCountAggregateOutputType | null
    _min: AssetMinAggregateOutputType | null
    _max: AssetMaxAggregateOutputType | null
  }

  export type AssetMinAggregateOutputType = {
    id: string | null
    projectId: string | null
    type: $Enums.AssetType | null
    name: string | null
    description: string | null
    imagePrompt: string | null
    imageUrl: string | null
    status: $Enums.JobStatus | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AssetMaxAggregateOutputType = {
    id: string | null
    projectId: string | null
    type: $Enums.AssetType | null
    name: string | null
    description: string | null
    imagePrompt: string | null
    imageUrl: string | null
    status: $Enums.JobStatus | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AssetCountAggregateOutputType = {
    id: number
    projectId: number
    type: number
    name: number
    description: number
    imagePrompt: number
    imageUrl: number
    status: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AssetMinAggregateInputType = {
    id?: true
    projectId?: true
    type?: true
    name?: true
    description?: true
    imagePrompt?: true
    imageUrl?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AssetMaxAggregateInputType = {
    id?: true
    projectId?: true
    type?: true
    name?: true
    description?: true
    imagePrompt?: true
    imageUrl?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AssetCountAggregateInputType = {
    id?: true
    projectId?: true
    type?: true
    name?: true
    description?: true
    imagePrompt?: true
    imageUrl?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AssetAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Asset to aggregate.
     */
    where?: AssetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Assets to fetch.
     */
    orderBy?: AssetOrderByWithRelationInput | AssetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AssetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Assets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Assets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Assets
    **/
    _count?: true | AssetCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AssetMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AssetMaxAggregateInputType
  }

  export type GetAssetAggregateType<T extends AssetAggregateArgs> = {
        [P in keyof T & keyof AggregateAsset]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAsset[P]>
      : GetScalarType<T[P], AggregateAsset[P]>
  }




  export type AssetGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AssetWhereInput
    orderBy?: AssetOrderByWithAggregationInput | AssetOrderByWithAggregationInput[]
    by: AssetScalarFieldEnum[] | AssetScalarFieldEnum
    having?: AssetScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AssetCountAggregateInputType | true
    _min?: AssetMinAggregateInputType
    _max?: AssetMaxAggregateInputType
  }

  export type AssetGroupByOutputType = {
    id: string
    projectId: string
    type: $Enums.AssetType
    name: string
    description: string
    imagePrompt: string
    imageUrl: string | null
    status: $Enums.JobStatus
    createdAt: Date
    updatedAt: Date
    _count: AssetCountAggregateOutputType | null
    _min: AssetMinAggregateOutputType | null
    _max: AssetMaxAggregateOutputType | null
  }

  type GetAssetGroupByPayload<T extends AssetGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AssetGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AssetGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AssetGroupByOutputType[P]>
            : GetScalarType<T[P], AssetGroupByOutputType[P]>
        }
      >
    >


  export type AssetSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projectId?: boolean
    type?: boolean
    name?: boolean
    description?: boolean
    imagePrompt?: boolean
    imageUrl?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    Project?: boolean | ProjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["asset"]>

  export type AssetSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projectId?: boolean
    type?: boolean
    name?: boolean
    description?: boolean
    imagePrompt?: boolean
    imageUrl?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    Project?: boolean | ProjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["asset"]>

  export type AssetSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projectId?: boolean
    type?: boolean
    name?: boolean
    description?: boolean
    imagePrompt?: boolean
    imageUrl?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    Project?: boolean | ProjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["asset"]>

  export type AssetSelectScalar = {
    id?: boolean
    projectId?: boolean
    type?: boolean
    name?: boolean
    description?: boolean
    imagePrompt?: boolean
    imageUrl?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AssetOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "projectId" | "type" | "name" | "description" | "imagePrompt" | "imageUrl" | "status" | "createdAt" | "updatedAt", ExtArgs["result"]["asset"]>
  export type AssetInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Project?: boolean | ProjectDefaultArgs<ExtArgs>
  }
  export type AssetIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Project?: boolean | ProjectDefaultArgs<ExtArgs>
  }
  export type AssetIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Project?: boolean | ProjectDefaultArgs<ExtArgs>
  }

  export type $AssetPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Asset"
    objects: {
      Project: Prisma.$ProjectPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      projectId: string
      type: $Enums.AssetType
      name: string
      description: string
      imagePrompt: string
      imageUrl: string | null
      status: $Enums.JobStatus
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["asset"]>
    composites: {}
  }

  type AssetGetPayload<S extends boolean | null | undefined | AssetDefaultArgs> = $Result.GetResult<Prisma.$AssetPayload, S>

  type AssetCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AssetFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AssetCountAggregateInputType | true
    }

  export interface AssetDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Asset'], meta: { name: 'Asset' } }
    /**
     * Find zero or one Asset that matches the filter.
     * @param {AssetFindUniqueArgs} args - Arguments to find a Asset
     * @example
     * // Get one Asset
     * const asset = await prisma.asset.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AssetFindUniqueArgs>(args: SelectSubset<T, AssetFindUniqueArgs<ExtArgs>>): Prisma__AssetClient<$Result.GetResult<Prisma.$AssetPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Asset that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AssetFindUniqueOrThrowArgs} args - Arguments to find a Asset
     * @example
     * // Get one Asset
     * const asset = await prisma.asset.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AssetFindUniqueOrThrowArgs>(args: SelectSubset<T, AssetFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AssetClient<$Result.GetResult<Prisma.$AssetPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Asset that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssetFindFirstArgs} args - Arguments to find a Asset
     * @example
     * // Get one Asset
     * const asset = await prisma.asset.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AssetFindFirstArgs>(args?: SelectSubset<T, AssetFindFirstArgs<ExtArgs>>): Prisma__AssetClient<$Result.GetResult<Prisma.$AssetPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Asset that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssetFindFirstOrThrowArgs} args - Arguments to find a Asset
     * @example
     * // Get one Asset
     * const asset = await prisma.asset.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AssetFindFirstOrThrowArgs>(args?: SelectSubset<T, AssetFindFirstOrThrowArgs<ExtArgs>>): Prisma__AssetClient<$Result.GetResult<Prisma.$AssetPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Assets that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssetFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Assets
     * const assets = await prisma.asset.findMany()
     * 
     * // Get first 10 Assets
     * const assets = await prisma.asset.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const assetWithIdOnly = await prisma.asset.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AssetFindManyArgs>(args?: SelectSubset<T, AssetFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AssetPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Asset.
     * @param {AssetCreateArgs} args - Arguments to create a Asset.
     * @example
     * // Create one Asset
     * const Asset = await prisma.asset.create({
     *   data: {
     *     // ... data to create a Asset
     *   }
     * })
     * 
     */
    create<T extends AssetCreateArgs>(args: SelectSubset<T, AssetCreateArgs<ExtArgs>>): Prisma__AssetClient<$Result.GetResult<Prisma.$AssetPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Assets.
     * @param {AssetCreateManyArgs} args - Arguments to create many Assets.
     * @example
     * // Create many Assets
     * const asset = await prisma.asset.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AssetCreateManyArgs>(args?: SelectSubset<T, AssetCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Assets and returns the data saved in the database.
     * @param {AssetCreateManyAndReturnArgs} args - Arguments to create many Assets.
     * @example
     * // Create many Assets
     * const asset = await prisma.asset.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Assets and only return the `id`
     * const assetWithIdOnly = await prisma.asset.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AssetCreateManyAndReturnArgs>(args?: SelectSubset<T, AssetCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AssetPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Asset.
     * @param {AssetDeleteArgs} args - Arguments to delete one Asset.
     * @example
     * // Delete one Asset
     * const Asset = await prisma.asset.delete({
     *   where: {
     *     // ... filter to delete one Asset
     *   }
     * })
     * 
     */
    delete<T extends AssetDeleteArgs>(args: SelectSubset<T, AssetDeleteArgs<ExtArgs>>): Prisma__AssetClient<$Result.GetResult<Prisma.$AssetPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Asset.
     * @param {AssetUpdateArgs} args - Arguments to update one Asset.
     * @example
     * // Update one Asset
     * const asset = await prisma.asset.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AssetUpdateArgs>(args: SelectSubset<T, AssetUpdateArgs<ExtArgs>>): Prisma__AssetClient<$Result.GetResult<Prisma.$AssetPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Assets.
     * @param {AssetDeleteManyArgs} args - Arguments to filter Assets to delete.
     * @example
     * // Delete a few Assets
     * const { count } = await prisma.asset.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AssetDeleteManyArgs>(args?: SelectSubset<T, AssetDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Assets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssetUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Assets
     * const asset = await prisma.asset.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AssetUpdateManyArgs>(args: SelectSubset<T, AssetUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Assets and returns the data updated in the database.
     * @param {AssetUpdateManyAndReturnArgs} args - Arguments to update many Assets.
     * @example
     * // Update many Assets
     * const asset = await prisma.asset.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Assets and only return the `id`
     * const assetWithIdOnly = await prisma.asset.updateManyAndReturn({
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
    updateManyAndReturn<T extends AssetUpdateManyAndReturnArgs>(args: SelectSubset<T, AssetUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AssetPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Asset.
     * @param {AssetUpsertArgs} args - Arguments to update or create a Asset.
     * @example
     * // Update or create a Asset
     * const asset = await prisma.asset.upsert({
     *   create: {
     *     // ... data to create a Asset
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Asset we want to update
     *   }
     * })
     */
    upsert<T extends AssetUpsertArgs>(args: SelectSubset<T, AssetUpsertArgs<ExtArgs>>): Prisma__AssetClient<$Result.GetResult<Prisma.$AssetPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Assets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssetCountArgs} args - Arguments to filter Assets to count.
     * @example
     * // Count the number of Assets
     * const count = await prisma.asset.count({
     *   where: {
     *     // ... the filter for the Assets we want to count
     *   }
     * })
    **/
    count<T extends AssetCountArgs>(
      args?: Subset<T, AssetCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AssetCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Asset.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssetAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AssetAggregateArgs>(args: Subset<T, AssetAggregateArgs>): Prisma.PrismaPromise<GetAssetAggregateType<T>>

    /**
     * Group by Asset.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssetGroupByArgs} args - Group by arguments.
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
      T extends AssetGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AssetGroupByArgs['orderBy'] }
        : { orderBy?: AssetGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AssetGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAssetGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Asset model
   */
  readonly fields: AssetFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Asset.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AssetClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    Project<T extends ProjectDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProjectDefaultArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Asset model
   */
  interface AssetFieldRefs {
    readonly id: FieldRef<"Asset", 'String'>
    readonly projectId: FieldRef<"Asset", 'String'>
    readonly type: FieldRef<"Asset", 'AssetType'>
    readonly name: FieldRef<"Asset", 'String'>
    readonly description: FieldRef<"Asset", 'String'>
    readonly imagePrompt: FieldRef<"Asset", 'String'>
    readonly imageUrl: FieldRef<"Asset", 'String'>
    readonly status: FieldRef<"Asset", 'JobStatus'>
    readonly createdAt: FieldRef<"Asset", 'DateTime'>
    readonly updatedAt: FieldRef<"Asset", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Asset findUnique
   */
  export type AssetFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Asset
     */
    select?: AssetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Asset
     */
    omit?: AssetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssetInclude<ExtArgs> | null
    /**
     * Filter, which Asset to fetch.
     */
    where: AssetWhereUniqueInput
  }

  /**
   * Asset findUniqueOrThrow
   */
  export type AssetFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Asset
     */
    select?: AssetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Asset
     */
    omit?: AssetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssetInclude<ExtArgs> | null
    /**
     * Filter, which Asset to fetch.
     */
    where: AssetWhereUniqueInput
  }

  /**
   * Asset findFirst
   */
  export type AssetFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Asset
     */
    select?: AssetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Asset
     */
    omit?: AssetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssetInclude<ExtArgs> | null
    /**
     * Filter, which Asset to fetch.
     */
    where?: AssetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Assets to fetch.
     */
    orderBy?: AssetOrderByWithRelationInput | AssetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Assets.
     */
    cursor?: AssetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Assets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Assets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Assets.
     */
    distinct?: AssetScalarFieldEnum | AssetScalarFieldEnum[]
  }

  /**
   * Asset findFirstOrThrow
   */
  export type AssetFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Asset
     */
    select?: AssetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Asset
     */
    omit?: AssetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssetInclude<ExtArgs> | null
    /**
     * Filter, which Asset to fetch.
     */
    where?: AssetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Assets to fetch.
     */
    orderBy?: AssetOrderByWithRelationInput | AssetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Assets.
     */
    cursor?: AssetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Assets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Assets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Assets.
     */
    distinct?: AssetScalarFieldEnum | AssetScalarFieldEnum[]
  }

  /**
   * Asset findMany
   */
  export type AssetFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Asset
     */
    select?: AssetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Asset
     */
    omit?: AssetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssetInclude<ExtArgs> | null
    /**
     * Filter, which Assets to fetch.
     */
    where?: AssetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Assets to fetch.
     */
    orderBy?: AssetOrderByWithRelationInput | AssetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Assets.
     */
    cursor?: AssetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Assets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Assets.
     */
    skip?: number
    distinct?: AssetScalarFieldEnum | AssetScalarFieldEnum[]
  }

  /**
   * Asset create
   */
  export type AssetCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Asset
     */
    select?: AssetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Asset
     */
    omit?: AssetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssetInclude<ExtArgs> | null
    /**
     * The data needed to create a Asset.
     */
    data: XOR<AssetCreateInput, AssetUncheckedCreateInput>
  }

  /**
   * Asset createMany
   */
  export type AssetCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Assets.
     */
    data: AssetCreateManyInput | AssetCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Asset createManyAndReturn
   */
  export type AssetCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Asset
     */
    select?: AssetSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Asset
     */
    omit?: AssetOmit<ExtArgs> | null
    /**
     * The data used to create many Assets.
     */
    data: AssetCreateManyInput | AssetCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssetIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Asset update
   */
  export type AssetUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Asset
     */
    select?: AssetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Asset
     */
    omit?: AssetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssetInclude<ExtArgs> | null
    /**
     * The data needed to update a Asset.
     */
    data: XOR<AssetUpdateInput, AssetUncheckedUpdateInput>
    /**
     * Choose, which Asset to update.
     */
    where: AssetWhereUniqueInput
  }

  /**
   * Asset updateMany
   */
  export type AssetUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Assets.
     */
    data: XOR<AssetUpdateManyMutationInput, AssetUncheckedUpdateManyInput>
    /**
     * Filter which Assets to update
     */
    where?: AssetWhereInput
    /**
     * Limit how many Assets to update.
     */
    limit?: number
  }

  /**
   * Asset updateManyAndReturn
   */
  export type AssetUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Asset
     */
    select?: AssetSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Asset
     */
    omit?: AssetOmit<ExtArgs> | null
    /**
     * The data used to update Assets.
     */
    data: XOR<AssetUpdateManyMutationInput, AssetUncheckedUpdateManyInput>
    /**
     * Filter which Assets to update
     */
    where?: AssetWhereInput
    /**
     * Limit how many Assets to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssetIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Asset upsert
   */
  export type AssetUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Asset
     */
    select?: AssetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Asset
     */
    omit?: AssetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssetInclude<ExtArgs> | null
    /**
     * The filter to search for the Asset to update in case it exists.
     */
    where: AssetWhereUniqueInput
    /**
     * In case the Asset found by the `where` argument doesn't exist, create a new Asset with this data.
     */
    create: XOR<AssetCreateInput, AssetUncheckedCreateInput>
    /**
     * In case the Asset was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AssetUpdateInput, AssetUncheckedUpdateInput>
  }

  /**
   * Asset delete
   */
  export type AssetDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Asset
     */
    select?: AssetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Asset
     */
    omit?: AssetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssetInclude<ExtArgs> | null
    /**
     * Filter which Asset to delete.
     */
    where: AssetWhereUniqueInput
  }

  /**
   * Asset deleteMany
   */
  export type AssetDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Assets to delete
     */
    where?: AssetWhereInput
    /**
     * Limit how many Assets to delete.
     */
    limit?: number
  }

  /**
   * Asset without action
   */
  export type AssetDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Asset
     */
    select?: AssetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Asset
     */
    omit?: AssetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssetInclude<ExtArgs> | null
  }


  /**
   * Model AudioAsset
   */

  export type AggregateAudioAsset = {
    _count: AudioAssetCountAggregateOutputType | null
    _min: AudioAssetMinAggregateOutputType | null
    _max: AudioAssetMaxAggregateOutputType | null
  }

  export type AudioAssetMinAggregateOutputType = {
    id: string | null
    projectId: string | null
    type: $Enums.AudioType | null
    sunoPrompt: string | null
    sunoJobId: string | null
    audioUrl: string | null
    lyrics: string | null
    mood: string | null
    genre: string | null
    status: $Enums.JobStatus | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AudioAssetMaxAggregateOutputType = {
    id: string | null
    projectId: string | null
    type: $Enums.AudioType | null
    sunoPrompt: string | null
    sunoJobId: string | null
    audioUrl: string | null
    lyrics: string | null
    mood: string | null
    genre: string | null
    status: $Enums.JobStatus | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AudioAssetCountAggregateOutputType = {
    id: number
    projectId: number
    type: number
    sunoPrompt: number
    sunoJobId: number
    audioUrl: number
    lyrics: number
    mood: number
    genre: number
    status: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AudioAssetMinAggregateInputType = {
    id?: true
    projectId?: true
    type?: true
    sunoPrompt?: true
    sunoJobId?: true
    audioUrl?: true
    lyrics?: true
    mood?: true
    genre?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AudioAssetMaxAggregateInputType = {
    id?: true
    projectId?: true
    type?: true
    sunoPrompt?: true
    sunoJobId?: true
    audioUrl?: true
    lyrics?: true
    mood?: true
    genre?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AudioAssetCountAggregateInputType = {
    id?: true
    projectId?: true
    type?: true
    sunoPrompt?: true
    sunoJobId?: true
    audioUrl?: true
    lyrics?: true
    mood?: true
    genre?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AudioAssetAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AudioAsset to aggregate.
     */
    where?: AudioAssetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AudioAssets to fetch.
     */
    orderBy?: AudioAssetOrderByWithRelationInput | AudioAssetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AudioAssetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AudioAssets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AudioAssets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AudioAssets
    **/
    _count?: true | AudioAssetCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AudioAssetMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AudioAssetMaxAggregateInputType
  }

  export type GetAudioAssetAggregateType<T extends AudioAssetAggregateArgs> = {
        [P in keyof T & keyof AggregateAudioAsset]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAudioAsset[P]>
      : GetScalarType<T[P], AggregateAudioAsset[P]>
  }




  export type AudioAssetGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AudioAssetWhereInput
    orderBy?: AudioAssetOrderByWithAggregationInput | AudioAssetOrderByWithAggregationInput[]
    by: AudioAssetScalarFieldEnum[] | AudioAssetScalarFieldEnum
    having?: AudioAssetScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AudioAssetCountAggregateInputType | true
    _min?: AudioAssetMinAggregateInputType
    _max?: AudioAssetMaxAggregateInputType
  }

  export type AudioAssetGroupByOutputType = {
    id: string
    projectId: string
    type: $Enums.AudioType
    sunoPrompt: string
    sunoJobId: string | null
    audioUrl: string | null
    lyrics: string | null
    mood: string | null
    genre: string | null
    status: $Enums.JobStatus
    createdAt: Date
    updatedAt: Date
    _count: AudioAssetCountAggregateOutputType | null
    _min: AudioAssetMinAggregateOutputType | null
    _max: AudioAssetMaxAggregateOutputType | null
  }

  type GetAudioAssetGroupByPayload<T extends AudioAssetGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AudioAssetGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AudioAssetGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AudioAssetGroupByOutputType[P]>
            : GetScalarType<T[P], AudioAssetGroupByOutputType[P]>
        }
      >
    >


  export type AudioAssetSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projectId?: boolean
    type?: boolean
    sunoPrompt?: boolean
    sunoJobId?: boolean
    audioUrl?: boolean
    lyrics?: boolean
    mood?: boolean
    genre?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    Project?: boolean | ProjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["audioAsset"]>

  export type AudioAssetSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projectId?: boolean
    type?: boolean
    sunoPrompt?: boolean
    sunoJobId?: boolean
    audioUrl?: boolean
    lyrics?: boolean
    mood?: boolean
    genre?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    Project?: boolean | ProjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["audioAsset"]>

  export type AudioAssetSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projectId?: boolean
    type?: boolean
    sunoPrompt?: boolean
    sunoJobId?: boolean
    audioUrl?: boolean
    lyrics?: boolean
    mood?: boolean
    genre?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    Project?: boolean | ProjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["audioAsset"]>

  export type AudioAssetSelectScalar = {
    id?: boolean
    projectId?: boolean
    type?: boolean
    sunoPrompt?: boolean
    sunoJobId?: boolean
    audioUrl?: boolean
    lyrics?: boolean
    mood?: boolean
    genre?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AudioAssetOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "projectId" | "type" | "sunoPrompt" | "sunoJobId" | "audioUrl" | "lyrics" | "mood" | "genre" | "status" | "createdAt" | "updatedAt", ExtArgs["result"]["audioAsset"]>
  export type AudioAssetInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Project?: boolean | ProjectDefaultArgs<ExtArgs>
  }
  export type AudioAssetIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Project?: boolean | ProjectDefaultArgs<ExtArgs>
  }
  export type AudioAssetIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Project?: boolean | ProjectDefaultArgs<ExtArgs>
  }

  export type $AudioAssetPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AudioAsset"
    objects: {
      Project: Prisma.$ProjectPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      projectId: string
      type: $Enums.AudioType
      sunoPrompt: string
      sunoJobId: string | null
      audioUrl: string | null
      lyrics: string | null
      mood: string | null
      genre: string | null
      status: $Enums.JobStatus
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["audioAsset"]>
    composites: {}
  }

  type AudioAssetGetPayload<S extends boolean | null | undefined | AudioAssetDefaultArgs> = $Result.GetResult<Prisma.$AudioAssetPayload, S>

  type AudioAssetCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AudioAssetFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AudioAssetCountAggregateInputType | true
    }

  export interface AudioAssetDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AudioAsset'], meta: { name: 'AudioAsset' } }
    /**
     * Find zero or one AudioAsset that matches the filter.
     * @param {AudioAssetFindUniqueArgs} args - Arguments to find a AudioAsset
     * @example
     * // Get one AudioAsset
     * const audioAsset = await prisma.audioAsset.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AudioAssetFindUniqueArgs>(args: SelectSubset<T, AudioAssetFindUniqueArgs<ExtArgs>>): Prisma__AudioAssetClient<$Result.GetResult<Prisma.$AudioAssetPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AudioAsset that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AudioAssetFindUniqueOrThrowArgs} args - Arguments to find a AudioAsset
     * @example
     * // Get one AudioAsset
     * const audioAsset = await prisma.audioAsset.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AudioAssetFindUniqueOrThrowArgs>(args: SelectSubset<T, AudioAssetFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AudioAssetClient<$Result.GetResult<Prisma.$AudioAssetPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AudioAsset that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AudioAssetFindFirstArgs} args - Arguments to find a AudioAsset
     * @example
     * // Get one AudioAsset
     * const audioAsset = await prisma.audioAsset.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AudioAssetFindFirstArgs>(args?: SelectSubset<T, AudioAssetFindFirstArgs<ExtArgs>>): Prisma__AudioAssetClient<$Result.GetResult<Prisma.$AudioAssetPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AudioAsset that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AudioAssetFindFirstOrThrowArgs} args - Arguments to find a AudioAsset
     * @example
     * // Get one AudioAsset
     * const audioAsset = await prisma.audioAsset.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AudioAssetFindFirstOrThrowArgs>(args?: SelectSubset<T, AudioAssetFindFirstOrThrowArgs<ExtArgs>>): Prisma__AudioAssetClient<$Result.GetResult<Prisma.$AudioAssetPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AudioAssets that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AudioAssetFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AudioAssets
     * const audioAssets = await prisma.audioAsset.findMany()
     * 
     * // Get first 10 AudioAssets
     * const audioAssets = await prisma.audioAsset.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const audioAssetWithIdOnly = await prisma.audioAsset.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AudioAssetFindManyArgs>(args?: SelectSubset<T, AudioAssetFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AudioAssetPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AudioAsset.
     * @param {AudioAssetCreateArgs} args - Arguments to create a AudioAsset.
     * @example
     * // Create one AudioAsset
     * const AudioAsset = await prisma.audioAsset.create({
     *   data: {
     *     // ... data to create a AudioAsset
     *   }
     * })
     * 
     */
    create<T extends AudioAssetCreateArgs>(args: SelectSubset<T, AudioAssetCreateArgs<ExtArgs>>): Prisma__AudioAssetClient<$Result.GetResult<Prisma.$AudioAssetPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AudioAssets.
     * @param {AudioAssetCreateManyArgs} args - Arguments to create many AudioAssets.
     * @example
     * // Create many AudioAssets
     * const audioAsset = await prisma.audioAsset.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AudioAssetCreateManyArgs>(args?: SelectSubset<T, AudioAssetCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AudioAssets and returns the data saved in the database.
     * @param {AudioAssetCreateManyAndReturnArgs} args - Arguments to create many AudioAssets.
     * @example
     * // Create many AudioAssets
     * const audioAsset = await prisma.audioAsset.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AudioAssets and only return the `id`
     * const audioAssetWithIdOnly = await prisma.audioAsset.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AudioAssetCreateManyAndReturnArgs>(args?: SelectSubset<T, AudioAssetCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AudioAssetPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AudioAsset.
     * @param {AudioAssetDeleteArgs} args - Arguments to delete one AudioAsset.
     * @example
     * // Delete one AudioAsset
     * const AudioAsset = await prisma.audioAsset.delete({
     *   where: {
     *     // ... filter to delete one AudioAsset
     *   }
     * })
     * 
     */
    delete<T extends AudioAssetDeleteArgs>(args: SelectSubset<T, AudioAssetDeleteArgs<ExtArgs>>): Prisma__AudioAssetClient<$Result.GetResult<Prisma.$AudioAssetPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AudioAsset.
     * @param {AudioAssetUpdateArgs} args - Arguments to update one AudioAsset.
     * @example
     * // Update one AudioAsset
     * const audioAsset = await prisma.audioAsset.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AudioAssetUpdateArgs>(args: SelectSubset<T, AudioAssetUpdateArgs<ExtArgs>>): Prisma__AudioAssetClient<$Result.GetResult<Prisma.$AudioAssetPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AudioAssets.
     * @param {AudioAssetDeleteManyArgs} args - Arguments to filter AudioAssets to delete.
     * @example
     * // Delete a few AudioAssets
     * const { count } = await prisma.audioAsset.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AudioAssetDeleteManyArgs>(args?: SelectSubset<T, AudioAssetDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AudioAssets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AudioAssetUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AudioAssets
     * const audioAsset = await prisma.audioAsset.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AudioAssetUpdateManyArgs>(args: SelectSubset<T, AudioAssetUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AudioAssets and returns the data updated in the database.
     * @param {AudioAssetUpdateManyAndReturnArgs} args - Arguments to update many AudioAssets.
     * @example
     * // Update many AudioAssets
     * const audioAsset = await prisma.audioAsset.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AudioAssets and only return the `id`
     * const audioAssetWithIdOnly = await prisma.audioAsset.updateManyAndReturn({
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
    updateManyAndReturn<T extends AudioAssetUpdateManyAndReturnArgs>(args: SelectSubset<T, AudioAssetUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AudioAssetPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AudioAsset.
     * @param {AudioAssetUpsertArgs} args - Arguments to update or create a AudioAsset.
     * @example
     * // Update or create a AudioAsset
     * const audioAsset = await prisma.audioAsset.upsert({
     *   create: {
     *     // ... data to create a AudioAsset
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AudioAsset we want to update
     *   }
     * })
     */
    upsert<T extends AudioAssetUpsertArgs>(args: SelectSubset<T, AudioAssetUpsertArgs<ExtArgs>>): Prisma__AudioAssetClient<$Result.GetResult<Prisma.$AudioAssetPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AudioAssets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AudioAssetCountArgs} args - Arguments to filter AudioAssets to count.
     * @example
     * // Count the number of AudioAssets
     * const count = await prisma.audioAsset.count({
     *   where: {
     *     // ... the filter for the AudioAssets we want to count
     *   }
     * })
    **/
    count<T extends AudioAssetCountArgs>(
      args?: Subset<T, AudioAssetCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AudioAssetCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AudioAsset.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AudioAssetAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AudioAssetAggregateArgs>(args: Subset<T, AudioAssetAggregateArgs>): Prisma.PrismaPromise<GetAudioAssetAggregateType<T>>

    /**
     * Group by AudioAsset.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AudioAssetGroupByArgs} args - Group by arguments.
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
      T extends AudioAssetGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AudioAssetGroupByArgs['orderBy'] }
        : { orderBy?: AudioAssetGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AudioAssetGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAudioAssetGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AudioAsset model
   */
  readonly fields: AudioAssetFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AudioAsset.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AudioAssetClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    Project<T extends ProjectDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProjectDefaultArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the AudioAsset model
   */
  interface AudioAssetFieldRefs {
    readonly id: FieldRef<"AudioAsset", 'String'>
    readonly projectId: FieldRef<"AudioAsset", 'String'>
    readonly type: FieldRef<"AudioAsset", 'AudioType'>
    readonly sunoPrompt: FieldRef<"AudioAsset", 'String'>
    readonly sunoJobId: FieldRef<"AudioAsset", 'String'>
    readonly audioUrl: FieldRef<"AudioAsset", 'String'>
    readonly lyrics: FieldRef<"AudioAsset", 'String'>
    readonly mood: FieldRef<"AudioAsset", 'String'>
    readonly genre: FieldRef<"AudioAsset", 'String'>
    readonly status: FieldRef<"AudioAsset", 'JobStatus'>
    readonly createdAt: FieldRef<"AudioAsset", 'DateTime'>
    readonly updatedAt: FieldRef<"AudioAsset", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AudioAsset findUnique
   */
  export type AudioAssetFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AudioAsset
     */
    select?: AudioAssetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AudioAsset
     */
    omit?: AudioAssetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AudioAssetInclude<ExtArgs> | null
    /**
     * Filter, which AudioAsset to fetch.
     */
    where: AudioAssetWhereUniqueInput
  }

  /**
   * AudioAsset findUniqueOrThrow
   */
  export type AudioAssetFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AudioAsset
     */
    select?: AudioAssetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AudioAsset
     */
    omit?: AudioAssetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AudioAssetInclude<ExtArgs> | null
    /**
     * Filter, which AudioAsset to fetch.
     */
    where: AudioAssetWhereUniqueInput
  }

  /**
   * AudioAsset findFirst
   */
  export type AudioAssetFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AudioAsset
     */
    select?: AudioAssetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AudioAsset
     */
    omit?: AudioAssetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AudioAssetInclude<ExtArgs> | null
    /**
     * Filter, which AudioAsset to fetch.
     */
    where?: AudioAssetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AudioAssets to fetch.
     */
    orderBy?: AudioAssetOrderByWithRelationInput | AudioAssetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AudioAssets.
     */
    cursor?: AudioAssetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AudioAssets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AudioAssets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AudioAssets.
     */
    distinct?: AudioAssetScalarFieldEnum | AudioAssetScalarFieldEnum[]
  }

  /**
   * AudioAsset findFirstOrThrow
   */
  export type AudioAssetFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AudioAsset
     */
    select?: AudioAssetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AudioAsset
     */
    omit?: AudioAssetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AudioAssetInclude<ExtArgs> | null
    /**
     * Filter, which AudioAsset to fetch.
     */
    where?: AudioAssetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AudioAssets to fetch.
     */
    orderBy?: AudioAssetOrderByWithRelationInput | AudioAssetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AudioAssets.
     */
    cursor?: AudioAssetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AudioAssets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AudioAssets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AudioAssets.
     */
    distinct?: AudioAssetScalarFieldEnum | AudioAssetScalarFieldEnum[]
  }

  /**
   * AudioAsset findMany
   */
  export type AudioAssetFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AudioAsset
     */
    select?: AudioAssetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AudioAsset
     */
    omit?: AudioAssetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AudioAssetInclude<ExtArgs> | null
    /**
     * Filter, which AudioAssets to fetch.
     */
    where?: AudioAssetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AudioAssets to fetch.
     */
    orderBy?: AudioAssetOrderByWithRelationInput | AudioAssetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AudioAssets.
     */
    cursor?: AudioAssetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AudioAssets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AudioAssets.
     */
    skip?: number
    distinct?: AudioAssetScalarFieldEnum | AudioAssetScalarFieldEnum[]
  }

  /**
   * AudioAsset create
   */
  export type AudioAssetCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AudioAsset
     */
    select?: AudioAssetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AudioAsset
     */
    omit?: AudioAssetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AudioAssetInclude<ExtArgs> | null
    /**
     * The data needed to create a AudioAsset.
     */
    data: XOR<AudioAssetCreateInput, AudioAssetUncheckedCreateInput>
  }

  /**
   * AudioAsset createMany
   */
  export type AudioAssetCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AudioAssets.
     */
    data: AudioAssetCreateManyInput | AudioAssetCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AudioAsset createManyAndReturn
   */
  export type AudioAssetCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AudioAsset
     */
    select?: AudioAssetSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AudioAsset
     */
    omit?: AudioAssetOmit<ExtArgs> | null
    /**
     * The data used to create many AudioAssets.
     */
    data: AudioAssetCreateManyInput | AudioAssetCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AudioAssetIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AudioAsset update
   */
  export type AudioAssetUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AudioAsset
     */
    select?: AudioAssetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AudioAsset
     */
    omit?: AudioAssetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AudioAssetInclude<ExtArgs> | null
    /**
     * The data needed to update a AudioAsset.
     */
    data: XOR<AudioAssetUpdateInput, AudioAssetUncheckedUpdateInput>
    /**
     * Choose, which AudioAsset to update.
     */
    where: AudioAssetWhereUniqueInput
  }

  /**
   * AudioAsset updateMany
   */
  export type AudioAssetUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AudioAssets.
     */
    data: XOR<AudioAssetUpdateManyMutationInput, AudioAssetUncheckedUpdateManyInput>
    /**
     * Filter which AudioAssets to update
     */
    where?: AudioAssetWhereInput
    /**
     * Limit how many AudioAssets to update.
     */
    limit?: number
  }

  /**
   * AudioAsset updateManyAndReturn
   */
  export type AudioAssetUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AudioAsset
     */
    select?: AudioAssetSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AudioAsset
     */
    omit?: AudioAssetOmit<ExtArgs> | null
    /**
     * The data used to update AudioAssets.
     */
    data: XOR<AudioAssetUpdateManyMutationInput, AudioAssetUncheckedUpdateManyInput>
    /**
     * Filter which AudioAssets to update
     */
    where?: AudioAssetWhereInput
    /**
     * Limit how many AudioAssets to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AudioAssetIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * AudioAsset upsert
   */
  export type AudioAssetUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AudioAsset
     */
    select?: AudioAssetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AudioAsset
     */
    omit?: AudioAssetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AudioAssetInclude<ExtArgs> | null
    /**
     * The filter to search for the AudioAsset to update in case it exists.
     */
    where: AudioAssetWhereUniqueInput
    /**
     * In case the AudioAsset found by the `where` argument doesn't exist, create a new AudioAsset with this data.
     */
    create: XOR<AudioAssetCreateInput, AudioAssetUncheckedCreateInput>
    /**
     * In case the AudioAsset was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AudioAssetUpdateInput, AudioAssetUncheckedUpdateInput>
  }

  /**
   * AudioAsset delete
   */
  export type AudioAssetDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AudioAsset
     */
    select?: AudioAssetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AudioAsset
     */
    omit?: AudioAssetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AudioAssetInclude<ExtArgs> | null
    /**
     * Filter which AudioAsset to delete.
     */
    where: AudioAssetWhereUniqueInput
  }

  /**
   * AudioAsset deleteMany
   */
  export type AudioAssetDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AudioAssets to delete
     */
    where?: AudioAssetWhereInput
    /**
     * Limit how many AudioAssets to delete.
     */
    limit?: number
  }

  /**
   * AudioAsset without action
   */
  export type AudioAssetDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AudioAsset
     */
    select?: AudioAssetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AudioAsset
     */
    omit?: AudioAssetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AudioAssetInclude<ExtArgs> | null
  }


  /**
   * Model Job
   */

  export type AggregateJob = {
    _count: JobCountAggregateOutputType | null
    _avg: JobAvgAggregateOutputType | null
    _sum: JobSumAggregateOutputType | null
    _min: JobMinAggregateOutputType | null
    _max: JobMaxAggregateOutputType | null
  }

  export type JobAvgAggregateOutputType = {
    attempts: number | null
  }

  export type JobSumAggregateOutputType = {
    attempts: number | null
  }

  export type JobMinAggregateOutputType = {
    id: string | null
    projectId: string | null
    type: string | null
    status: $Enums.JobStatus | null
    error: string | null
    attempts: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type JobMaxAggregateOutputType = {
    id: string | null
    projectId: string | null
    type: string | null
    status: $Enums.JobStatus | null
    error: string | null
    attempts: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type JobCountAggregateOutputType = {
    id: number
    projectId: number
    type: number
    status: number
    payload: number
    result: number
    error: number
    attempts: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type JobAvgAggregateInputType = {
    attempts?: true
  }

  export type JobSumAggregateInputType = {
    attempts?: true
  }

  export type JobMinAggregateInputType = {
    id?: true
    projectId?: true
    type?: true
    status?: true
    error?: true
    attempts?: true
    createdAt?: true
    updatedAt?: true
  }

  export type JobMaxAggregateInputType = {
    id?: true
    projectId?: true
    type?: true
    status?: true
    error?: true
    attempts?: true
    createdAt?: true
    updatedAt?: true
  }

  export type JobCountAggregateInputType = {
    id?: true
    projectId?: true
    type?: true
    status?: true
    payload?: true
    result?: true
    error?: true
    attempts?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type JobAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Job to aggregate.
     */
    where?: JobWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Jobs to fetch.
     */
    orderBy?: JobOrderByWithRelationInput | JobOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: JobWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Jobs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Jobs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Jobs
    **/
    _count?: true | JobCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: JobAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: JobSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: JobMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: JobMaxAggregateInputType
  }

  export type GetJobAggregateType<T extends JobAggregateArgs> = {
        [P in keyof T & keyof AggregateJob]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateJob[P]>
      : GetScalarType<T[P], AggregateJob[P]>
  }




  export type JobGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: JobWhereInput
    orderBy?: JobOrderByWithAggregationInput | JobOrderByWithAggregationInput[]
    by: JobScalarFieldEnum[] | JobScalarFieldEnum
    having?: JobScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: JobCountAggregateInputType | true
    _avg?: JobAvgAggregateInputType
    _sum?: JobSumAggregateInputType
    _min?: JobMinAggregateInputType
    _max?: JobMaxAggregateInputType
  }

  export type JobGroupByOutputType = {
    id: string
    projectId: string
    type: string
    status: $Enums.JobStatus
    payload: JsonValue | null
    result: JsonValue | null
    error: string | null
    attempts: number
    createdAt: Date
    updatedAt: Date
    _count: JobCountAggregateOutputType | null
    _avg: JobAvgAggregateOutputType | null
    _sum: JobSumAggregateOutputType | null
    _min: JobMinAggregateOutputType | null
    _max: JobMaxAggregateOutputType | null
  }

  type GetJobGroupByPayload<T extends JobGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<JobGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof JobGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], JobGroupByOutputType[P]>
            : GetScalarType<T[P], JobGroupByOutputType[P]>
        }
      >
    >


  export type JobSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projectId?: boolean
    type?: boolean
    status?: boolean
    payload?: boolean
    result?: boolean
    error?: boolean
    attempts?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    Project?: boolean | ProjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["job"]>

  export type JobSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projectId?: boolean
    type?: boolean
    status?: boolean
    payload?: boolean
    result?: boolean
    error?: boolean
    attempts?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    Project?: boolean | ProjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["job"]>

  export type JobSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projectId?: boolean
    type?: boolean
    status?: boolean
    payload?: boolean
    result?: boolean
    error?: boolean
    attempts?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    Project?: boolean | ProjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["job"]>

  export type JobSelectScalar = {
    id?: boolean
    projectId?: boolean
    type?: boolean
    status?: boolean
    payload?: boolean
    result?: boolean
    error?: boolean
    attempts?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type JobOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "projectId" | "type" | "status" | "payload" | "result" | "error" | "attempts" | "createdAt" | "updatedAt", ExtArgs["result"]["job"]>
  export type JobInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Project?: boolean | ProjectDefaultArgs<ExtArgs>
  }
  export type JobIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Project?: boolean | ProjectDefaultArgs<ExtArgs>
  }
  export type JobIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Project?: boolean | ProjectDefaultArgs<ExtArgs>
  }

  export type $JobPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Job"
    objects: {
      Project: Prisma.$ProjectPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      projectId: string
      type: string
      status: $Enums.JobStatus
      payload: Prisma.JsonValue | null
      result: Prisma.JsonValue | null
      error: string | null
      attempts: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["job"]>
    composites: {}
  }

  type JobGetPayload<S extends boolean | null | undefined | JobDefaultArgs> = $Result.GetResult<Prisma.$JobPayload, S>

  type JobCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<JobFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: JobCountAggregateInputType | true
    }

  export interface JobDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Job'], meta: { name: 'Job' } }
    /**
     * Find zero or one Job that matches the filter.
     * @param {JobFindUniqueArgs} args - Arguments to find a Job
     * @example
     * // Get one Job
     * const job = await prisma.job.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends JobFindUniqueArgs>(args: SelectSubset<T, JobFindUniqueArgs<ExtArgs>>): Prisma__JobClient<$Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Job that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {JobFindUniqueOrThrowArgs} args - Arguments to find a Job
     * @example
     * // Get one Job
     * const job = await prisma.job.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends JobFindUniqueOrThrowArgs>(args: SelectSubset<T, JobFindUniqueOrThrowArgs<ExtArgs>>): Prisma__JobClient<$Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Job that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobFindFirstArgs} args - Arguments to find a Job
     * @example
     * // Get one Job
     * const job = await prisma.job.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends JobFindFirstArgs>(args?: SelectSubset<T, JobFindFirstArgs<ExtArgs>>): Prisma__JobClient<$Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Job that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobFindFirstOrThrowArgs} args - Arguments to find a Job
     * @example
     * // Get one Job
     * const job = await prisma.job.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends JobFindFirstOrThrowArgs>(args?: SelectSubset<T, JobFindFirstOrThrowArgs<ExtArgs>>): Prisma__JobClient<$Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Jobs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Jobs
     * const jobs = await prisma.job.findMany()
     * 
     * // Get first 10 Jobs
     * const jobs = await prisma.job.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const jobWithIdOnly = await prisma.job.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends JobFindManyArgs>(args?: SelectSubset<T, JobFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Job.
     * @param {JobCreateArgs} args - Arguments to create a Job.
     * @example
     * // Create one Job
     * const Job = await prisma.job.create({
     *   data: {
     *     // ... data to create a Job
     *   }
     * })
     * 
     */
    create<T extends JobCreateArgs>(args: SelectSubset<T, JobCreateArgs<ExtArgs>>): Prisma__JobClient<$Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Jobs.
     * @param {JobCreateManyArgs} args - Arguments to create many Jobs.
     * @example
     * // Create many Jobs
     * const job = await prisma.job.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends JobCreateManyArgs>(args?: SelectSubset<T, JobCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Jobs and returns the data saved in the database.
     * @param {JobCreateManyAndReturnArgs} args - Arguments to create many Jobs.
     * @example
     * // Create many Jobs
     * const job = await prisma.job.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Jobs and only return the `id`
     * const jobWithIdOnly = await prisma.job.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends JobCreateManyAndReturnArgs>(args?: SelectSubset<T, JobCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Job.
     * @param {JobDeleteArgs} args - Arguments to delete one Job.
     * @example
     * // Delete one Job
     * const Job = await prisma.job.delete({
     *   where: {
     *     // ... filter to delete one Job
     *   }
     * })
     * 
     */
    delete<T extends JobDeleteArgs>(args: SelectSubset<T, JobDeleteArgs<ExtArgs>>): Prisma__JobClient<$Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Job.
     * @param {JobUpdateArgs} args - Arguments to update one Job.
     * @example
     * // Update one Job
     * const job = await prisma.job.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends JobUpdateArgs>(args: SelectSubset<T, JobUpdateArgs<ExtArgs>>): Prisma__JobClient<$Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Jobs.
     * @param {JobDeleteManyArgs} args - Arguments to filter Jobs to delete.
     * @example
     * // Delete a few Jobs
     * const { count } = await prisma.job.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends JobDeleteManyArgs>(args?: SelectSubset<T, JobDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Jobs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Jobs
     * const job = await prisma.job.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends JobUpdateManyArgs>(args: SelectSubset<T, JobUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Jobs and returns the data updated in the database.
     * @param {JobUpdateManyAndReturnArgs} args - Arguments to update many Jobs.
     * @example
     * // Update many Jobs
     * const job = await prisma.job.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Jobs and only return the `id`
     * const jobWithIdOnly = await prisma.job.updateManyAndReturn({
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
    updateManyAndReturn<T extends JobUpdateManyAndReturnArgs>(args: SelectSubset<T, JobUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Job.
     * @param {JobUpsertArgs} args - Arguments to update or create a Job.
     * @example
     * // Update or create a Job
     * const job = await prisma.job.upsert({
     *   create: {
     *     // ... data to create a Job
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Job we want to update
     *   }
     * })
     */
    upsert<T extends JobUpsertArgs>(args: SelectSubset<T, JobUpsertArgs<ExtArgs>>): Prisma__JobClient<$Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Jobs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobCountArgs} args - Arguments to filter Jobs to count.
     * @example
     * // Count the number of Jobs
     * const count = await prisma.job.count({
     *   where: {
     *     // ... the filter for the Jobs we want to count
     *   }
     * })
    **/
    count<T extends JobCountArgs>(
      args?: Subset<T, JobCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], JobCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Job.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends JobAggregateArgs>(args: Subset<T, JobAggregateArgs>): Prisma.PrismaPromise<GetJobAggregateType<T>>

    /**
     * Group by Job.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobGroupByArgs} args - Group by arguments.
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
      T extends JobGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: JobGroupByArgs['orderBy'] }
        : { orderBy?: JobGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, JobGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetJobGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Job model
   */
  readonly fields: JobFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Job.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__JobClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    Project<T extends ProjectDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProjectDefaultArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Job model
   */
  interface JobFieldRefs {
    readonly id: FieldRef<"Job", 'String'>
    readonly projectId: FieldRef<"Job", 'String'>
    readonly type: FieldRef<"Job", 'String'>
    readonly status: FieldRef<"Job", 'JobStatus'>
    readonly payload: FieldRef<"Job", 'Json'>
    readonly result: FieldRef<"Job", 'Json'>
    readonly error: FieldRef<"Job", 'String'>
    readonly attempts: FieldRef<"Job", 'Int'>
    readonly createdAt: FieldRef<"Job", 'DateTime'>
    readonly updatedAt: FieldRef<"Job", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Job findUnique
   */
  export type JobFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Job
     */
    select?: JobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Job
     */
    omit?: JobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobInclude<ExtArgs> | null
    /**
     * Filter, which Job to fetch.
     */
    where: JobWhereUniqueInput
  }

  /**
   * Job findUniqueOrThrow
   */
  export type JobFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Job
     */
    select?: JobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Job
     */
    omit?: JobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobInclude<ExtArgs> | null
    /**
     * Filter, which Job to fetch.
     */
    where: JobWhereUniqueInput
  }

  /**
   * Job findFirst
   */
  export type JobFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Job
     */
    select?: JobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Job
     */
    omit?: JobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobInclude<ExtArgs> | null
    /**
     * Filter, which Job to fetch.
     */
    where?: JobWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Jobs to fetch.
     */
    orderBy?: JobOrderByWithRelationInput | JobOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Jobs.
     */
    cursor?: JobWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Jobs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Jobs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Jobs.
     */
    distinct?: JobScalarFieldEnum | JobScalarFieldEnum[]
  }

  /**
   * Job findFirstOrThrow
   */
  export type JobFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Job
     */
    select?: JobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Job
     */
    omit?: JobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobInclude<ExtArgs> | null
    /**
     * Filter, which Job to fetch.
     */
    where?: JobWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Jobs to fetch.
     */
    orderBy?: JobOrderByWithRelationInput | JobOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Jobs.
     */
    cursor?: JobWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Jobs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Jobs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Jobs.
     */
    distinct?: JobScalarFieldEnum | JobScalarFieldEnum[]
  }

  /**
   * Job findMany
   */
  export type JobFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Job
     */
    select?: JobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Job
     */
    omit?: JobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobInclude<ExtArgs> | null
    /**
     * Filter, which Jobs to fetch.
     */
    where?: JobWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Jobs to fetch.
     */
    orderBy?: JobOrderByWithRelationInput | JobOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Jobs.
     */
    cursor?: JobWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Jobs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Jobs.
     */
    skip?: number
    distinct?: JobScalarFieldEnum | JobScalarFieldEnum[]
  }

  /**
   * Job create
   */
  export type JobCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Job
     */
    select?: JobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Job
     */
    omit?: JobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobInclude<ExtArgs> | null
    /**
     * The data needed to create a Job.
     */
    data: XOR<JobCreateInput, JobUncheckedCreateInput>
  }

  /**
   * Job createMany
   */
  export type JobCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Jobs.
     */
    data: JobCreateManyInput | JobCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Job createManyAndReturn
   */
  export type JobCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Job
     */
    select?: JobSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Job
     */
    omit?: JobOmit<ExtArgs> | null
    /**
     * The data used to create many Jobs.
     */
    data: JobCreateManyInput | JobCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Job update
   */
  export type JobUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Job
     */
    select?: JobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Job
     */
    omit?: JobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobInclude<ExtArgs> | null
    /**
     * The data needed to update a Job.
     */
    data: XOR<JobUpdateInput, JobUncheckedUpdateInput>
    /**
     * Choose, which Job to update.
     */
    where: JobWhereUniqueInput
  }

  /**
   * Job updateMany
   */
  export type JobUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Jobs.
     */
    data: XOR<JobUpdateManyMutationInput, JobUncheckedUpdateManyInput>
    /**
     * Filter which Jobs to update
     */
    where?: JobWhereInput
    /**
     * Limit how many Jobs to update.
     */
    limit?: number
  }

  /**
   * Job updateManyAndReturn
   */
  export type JobUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Job
     */
    select?: JobSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Job
     */
    omit?: JobOmit<ExtArgs> | null
    /**
     * The data used to update Jobs.
     */
    data: XOR<JobUpdateManyMutationInput, JobUncheckedUpdateManyInput>
    /**
     * Filter which Jobs to update
     */
    where?: JobWhereInput
    /**
     * Limit how many Jobs to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Job upsert
   */
  export type JobUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Job
     */
    select?: JobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Job
     */
    omit?: JobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobInclude<ExtArgs> | null
    /**
     * The filter to search for the Job to update in case it exists.
     */
    where: JobWhereUniqueInput
    /**
     * In case the Job found by the `where` argument doesn't exist, create a new Job with this data.
     */
    create: XOR<JobCreateInput, JobUncheckedCreateInput>
    /**
     * In case the Job was found with the provided `where` argument, update it with this data.
     */
    update: XOR<JobUpdateInput, JobUncheckedUpdateInput>
  }

  /**
   * Job delete
   */
  export type JobDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Job
     */
    select?: JobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Job
     */
    omit?: JobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobInclude<ExtArgs> | null
    /**
     * Filter which Job to delete.
     */
    where: JobWhereUniqueInput
  }

  /**
   * Job deleteMany
   */
  export type JobDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Jobs to delete
     */
    where?: JobWhereInput
    /**
     * Limit how many Jobs to delete.
     */
    limit?: number
  }

  /**
   * Job without action
   */
  export type JobDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Job
     */
    select?: JobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Job
     */
    omit?: JobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobInclude<ExtArgs> | null
  }


  /**
   * Model Project
   */

  export type AggregateProject = {
    _count: ProjectCountAggregateOutputType | null
    _avg: ProjectAvgAggregateOutputType | null
    _sum: ProjectSumAggregateOutputType | null
    _min: ProjectMinAggregateOutputType | null
    _max: ProjectMaxAggregateOutputType | null
  }

  export type ProjectAvgAggregateOutputType = {
    totalScenes: number | null
    completedScenes: number | null
  }

  export type ProjectSumAggregateOutputType = {
    totalScenes: number | null
    completedScenes: number | null
  }

  export type ProjectMinAggregateOutputType = {
    id: string | null
    title: string | null
    status: $Enums.ProjectStatus | null
    ide: string | null
    gaya: $Enums.StoryStyle | null
    tokohUtama: string | null
    asalDaerah: string | null
    latar: $Enums.HistoricalEra | null
    latarDetail: string | null
    plot: string | null
    finalVideoUrl: string | null
    driveFileId: string | null
    driveShareLink: string | null
    totalScenes: number | null
    completedScenes: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProjectMaxAggregateOutputType = {
    id: string | null
    title: string | null
    status: $Enums.ProjectStatus | null
    ide: string | null
    gaya: $Enums.StoryStyle | null
    tokohUtama: string | null
    asalDaerah: string | null
    latar: $Enums.HistoricalEra | null
    latarDetail: string | null
    plot: string | null
    finalVideoUrl: string | null
    driveFileId: string | null
    driveShareLink: string | null
    totalScenes: number | null
    completedScenes: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProjectCountAggregateOutputType = {
    id: number
    title: number
    status: number
    ide: number
    gaya: number
    tokohUtama: number
    asalDaerah: number
    latar: number
    latarDetail: number
    plot: number
    screenplay: number
    finalVideoUrl: number
    driveFileId: number
    driveShareLink: number
    totalScenes: number
    completedScenes: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ProjectAvgAggregateInputType = {
    totalScenes?: true
    completedScenes?: true
  }

  export type ProjectSumAggregateInputType = {
    totalScenes?: true
    completedScenes?: true
  }

  export type ProjectMinAggregateInputType = {
    id?: true
    title?: true
    status?: true
    ide?: true
    gaya?: true
    tokohUtama?: true
    asalDaerah?: true
    latar?: true
    latarDetail?: true
    plot?: true
    finalVideoUrl?: true
    driveFileId?: true
    driveShareLink?: true
    totalScenes?: true
    completedScenes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProjectMaxAggregateInputType = {
    id?: true
    title?: true
    status?: true
    ide?: true
    gaya?: true
    tokohUtama?: true
    asalDaerah?: true
    latar?: true
    latarDetail?: true
    plot?: true
    finalVideoUrl?: true
    driveFileId?: true
    driveShareLink?: true
    totalScenes?: true
    completedScenes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProjectCountAggregateInputType = {
    id?: true
    title?: true
    status?: true
    ide?: true
    gaya?: true
    tokohUtama?: true
    asalDaerah?: true
    latar?: true
    latarDetail?: true
    plot?: true
    screenplay?: true
    finalVideoUrl?: true
    driveFileId?: true
    driveShareLink?: true
    totalScenes?: true
    completedScenes?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ProjectAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Project to aggregate.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Projects
    **/
    _count?: true | ProjectCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProjectAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProjectSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProjectMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProjectMaxAggregateInputType
  }

  export type GetProjectAggregateType<T extends ProjectAggregateArgs> = {
        [P in keyof T & keyof AggregateProject]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProject[P]>
      : GetScalarType<T[P], AggregateProject[P]>
  }




  export type ProjectGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjectWhereInput
    orderBy?: ProjectOrderByWithAggregationInput | ProjectOrderByWithAggregationInput[]
    by: ProjectScalarFieldEnum[] | ProjectScalarFieldEnum
    having?: ProjectScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProjectCountAggregateInputType | true
    _avg?: ProjectAvgAggregateInputType
    _sum?: ProjectSumAggregateInputType
    _min?: ProjectMinAggregateInputType
    _max?: ProjectMaxAggregateInputType
  }

  export type ProjectGroupByOutputType = {
    id: string
    title: string
    status: $Enums.ProjectStatus
    ide: string
    gaya: $Enums.StoryStyle
    tokohUtama: string
    asalDaerah: string
    latar: $Enums.HistoricalEra
    latarDetail: string | null
    plot: string
    screenplay: JsonValue | null
    finalVideoUrl: string | null
    driveFileId: string | null
    driveShareLink: string | null
    totalScenes: number
    completedScenes: number
    createdAt: Date
    updatedAt: Date
    _count: ProjectCountAggregateOutputType | null
    _avg: ProjectAvgAggregateOutputType | null
    _sum: ProjectSumAggregateOutputType | null
    _min: ProjectMinAggregateOutputType | null
    _max: ProjectMaxAggregateOutputType | null
  }

  type GetProjectGroupByPayload<T extends ProjectGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProjectGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProjectGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProjectGroupByOutputType[P]>
            : GetScalarType<T[P], ProjectGroupByOutputType[P]>
        }
      >
    >


  export type ProjectSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    status?: boolean
    ide?: boolean
    gaya?: boolean
    tokohUtama?: boolean
    asalDaerah?: boolean
    latar?: boolean
    latarDetail?: boolean
    plot?: boolean
    screenplay?: boolean
    finalVideoUrl?: boolean
    driveFileId?: boolean
    driveShareLink?: boolean
    totalScenes?: boolean
    completedScenes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    Asset?: boolean | Project$AssetArgs<ExtArgs>
    AudioAsset?: boolean | Project$AudioAssetArgs<ExtArgs>
    Job?: boolean | Project$JobArgs<ExtArgs>
    Scene?: boolean | Project$SceneArgs<ExtArgs>
    _count?: boolean | ProjectCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["project"]>

  export type ProjectSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    status?: boolean
    ide?: boolean
    gaya?: boolean
    tokohUtama?: boolean
    asalDaerah?: boolean
    latar?: boolean
    latarDetail?: boolean
    plot?: boolean
    screenplay?: boolean
    finalVideoUrl?: boolean
    driveFileId?: boolean
    driveShareLink?: boolean
    totalScenes?: boolean
    completedScenes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["project"]>

  export type ProjectSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    status?: boolean
    ide?: boolean
    gaya?: boolean
    tokohUtama?: boolean
    asalDaerah?: boolean
    latar?: boolean
    latarDetail?: boolean
    plot?: boolean
    screenplay?: boolean
    finalVideoUrl?: boolean
    driveFileId?: boolean
    driveShareLink?: boolean
    totalScenes?: boolean
    completedScenes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["project"]>

  export type ProjectSelectScalar = {
    id?: boolean
    title?: boolean
    status?: boolean
    ide?: boolean
    gaya?: boolean
    tokohUtama?: boolean
    asalDaerah?: boolean
    latar?: boolean
    latarDetail?: boolean
    plot?: boolean
    screenplay?: boolean
    finalVideoUrl?: boolean
    driveFileId?: boolean
    driveShareLink?: boolean
    totalScenes?: boolean
    completedScenes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ProjectOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "status" | "ide" | "gaya" | "tokohUtama" | "asalDaerah" | "latar" | "latarDetail" | "plot" | "screenplay" | "finalVideoUrl" | "driveFileId" | "driveShareLink" | "totalScenes" | "completedScenes" | "createdAt" | "updatedAt", ExtArgs["result"]["project"]>
  export type ProjectInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Asset?: boolean | Project$AssetArgs<ExtArgs>
    AudioAsset?: boolean | Project$AudioAssetArgs<ExtArgs>
    Job?: boolean | Project$JobArgs<ExtArgs>
    Scene?: boolean | Project$SceneArgs<ExtArgs>
    _count?: boolean | ProjectCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ProjectIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type ProjectIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ProjectPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Project"
    objects: {
      Asset: Prisma.$AssetPayload<ExtArgs>[]
      AudioAsset: Prisma.$AudioAssetPayload<ExtArgs>[]
      Job: Prisma.$JobPayload<ExtArgs>[]
      Scene: Prisma.$ScenePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      status: $Enums.ProjectStatus
      ide: string
      gaya: $Enums.StoryStyle
      tokohUtama: string
      asalDaerah: string
      latar: $Enums.HistoricalEra
      latarDetail: string | null
      plot: string
      screenplay: Prisma.JsonValue | null
      finalVideoUrl: string | null
      driveFileId: string | null
      driveShareLink: string | null
      totalScenes: number
      completedScenes: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["project"]>
    composites: {}
  }

  type ProjectGetPayload<S extends boolean | null | undefined | ProjectDefaultArgs> = $Result.GetResult<Prisma.$ProjectPayload, S>

  type ProjectCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProjectFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProjectCountAggregateInputType | true
    }

  export interface ProjectDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Project'], meta: { name: 'Project' } }
    /**
     * Find zero or one Project that matches the filter.
     * @param {ProjectFindUniqueArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProjectFindUniqueArgs>(args: SelectSubset<T, ProjectFindUniqueArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Project that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProjectFindUniqueOrThrowArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProjectFindUniqueOrThrowArgs>(args: SelectSubset<T, ProjectFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Project that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectFindFirstArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProjectFindFirstArgs>(args?: SelectSubset<T, ProjectFindFirstArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Project that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectFindFirstOrThrowArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProjectFindFirstOrThrowArgs>(args?: SelectSubset<T, ProjectFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Projects that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Projects
     * const projects = await prisma.project.findMany()
     * 
     * // Get first 10 Projects
     * const projects = await prisma.project.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const projectWithIdOnly = await prisma.project.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProjectFindManyArgs>(args?: SelectSubset<T, ProjectFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Project.
     * @param {ProjectCreateArgs} args - Arguments to create a Project.
     * @example
     * // Create one Project
     * const Project = await prisma.project.create({
     *   data: {
     *     // ... data to create a Project
     *   }
     * })
     * 
     */
    create<T extends ProjectCreateArgs>(args: SelectSubset<T, ProjectCreateArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Projects.
     * @param {ProjectCreateManyArgs} args - Arguments to create many Projects.
     * @example
     * // Create many Projects
     * const project = await prisma.project.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProjectCreateManyArgs>(args?: SelectSubset<T, ProjectCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Projects and returns the data saved in the database.
     * @param {ProjectCreateManyAndReturnArgs} args - Arguments to create many Projects.
     * @example
     * // Create many Projects
     * const project = await prisma.project.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Projects and only return the `id`
     * const projectWithIdOnly = await prisma.project.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProjectCreateManyAndReturnArgs>(args?: SelectSubset<T, ProjectCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Project.
     * @param {ProjectDeleteArgs} args - Arguments to delete one Project.
     * @example
     * // Delete one Project
     * const Project = await prisma.project.delete({
     *   where: {
     *     // ... filter to delete one Project
     *   }
     * })
     * 
     */
    delete<T extends ProjectDeleteArgs>(args: SelectSubset<T, ProjectDeleteArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Project.
     * @param {ProjectUpdateArgs} args - Arguments to update one Project.
     * @example
     * // Update one Project
     * const project = await prisma.project.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProjectUpdateArgs>(args: SelectSubset<T, ProjectUpdateArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Projects.
     * @param {ProjectDeleteManyArgs} args - Arguments to filter Projects to delete.
     * @example
     * // Delete a few Projects
     * const { count } = await prisma.project.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProjectDeleteManyArgs>(args?: SelectSubset<T, ProjectDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Projects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Projects
     * const project = await prisma.project.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProjectUpdateManyArgs>(args: SelectSubset<T, ProjectUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Projects and returns the data updated in the database.
     * @param {ProjectUpdateManyAndReturnArgs} args - Arguments to update many Projects.
     * @example
     * // Update many Projects
     * const project = await prisma.project.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Projects and only return the `id`
     * const projectWithIdOnly = await prisma.project.updateManyAndReturn({
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
    updateManyAndReturn<T extends ProjectUpdateManyAndReturnArgs>(args: SelectSubset<T, ProjectUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Project.
     * @param {ProjectUpsertArgs} args - Arguments to update or create a Project.
     * @example
     * // Update or create a Project
     * const project = await prisma.project.upsert({
     *   create: {
     *     // ... data to create a Project
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Project we want to update
     *   }
     * })
     */
    upsert<T extends ProjectUpsertArgs>(args: SelectSubset<T, ProjectUpsertArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Projects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectCountArgs} args - Arguments to filter Projects to count.
     * @example
     * // Count the number of Projects
     * const count = await prisma.project.count({
     *   where: {
     *     // ... the filter for the Projects we want to count
     *   }
     * })
    **/
    count<T extends ProjectCountArgs>(
      args?: Subset<T, ProjectCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProjectCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Project.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ProjectAggregateArgs>(args: Subset<T, ProjectAggregateArgs>): Prisma.PrismaPromise<GetProjectAggregateType<T>>

    /**
     * Group by Project.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectGroupByArgs} args - Group by arguments.
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
      T extends ProjectGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProjectGroupByArgs['orderBy'] }
        : { orderBy?: ProjectGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ProjectGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProjectGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Project model
   */
  readonly fields: ProjectFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Project.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProjectClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    Asset<T extends Project$AssetArgs<ExtArgs> = {}>(args?: Subset<T, Project$AssetArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AssetPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    AudioAsset<T extends Project$AudioAssetArgs<ExtArgs> = {}>(args?: Subset<T, Project$AudioAssetArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AudioAssetPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    Job<T extends Project$JobArgs<ExtArgs> = {}>(args?: Subset<T, Project$JobArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    Scene<T extends Project$SceneArgs<ExtArgs> = {}>(args?: Subset<T, Project$SceneArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ScenePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Project model
   */
  interface ProjectFieldRefs {
    readonly id: FieldRef<"Project", 'String'>
    readonly title: FieldRef<"Project", 'String'>
    readonly status: FieldRef<"Project", 'ProjectStatus'>
    readonly ide: FieldRef<"Project", 'String'>
    readonly gaya: FieldRef<"Project", 'StoryStyle'>
    readonly tokohUtama: FieldRef<"Project", 'String'>
    readonly asalDaerah: FieldRef<"Project", 'String'>
    readonly latar: FieldRef<"Project", 'HistoricalEra'>
    readonly latarDetail: FieldRef<"Project", 'String'>
    readonly plot: FieldRef<"Project", 'String'>
    readonly screenplay: FieldRef<"Project", 'Json'>
    readonly finalVideoUrl: FieldRef<"Project", 'String'>
    readonly driveFileId: FieldRef<"Project", 'String'>
    readonly driveShareLink: FieldRef<"Project", 'String'>
    readonly totalScenes: FieldRef<"Project", 'Int'>
    readonly completedScenes: FieldRef<"Project", 'Int'>
    readonly createdAt: FieldRef<"Project", 'DateTime'>
    readonly updatedAt: FieldRef<"Project", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Project findUnique
   */
  export type ProjectFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project findUniqueOrThrow
   */
  export type ProjectFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project findFirst
   */
  export type ProjectFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Projects.
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Projects.
     */
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * Project findFirstOrThrow
   */
  export type ProjectFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Projects.
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Projects.
     */
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * Project findMany
   */
  export type ProjectFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Projects to fetch.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Projects.
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * Project create
   */
  export type ProjectCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * The data needed to create a Project.
     */
    data: XOR<ProjectCreateInput, ProjectUncheckedCreateInput>
  }

  /**
   * Project createMany
   */
  export type ProjectCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Projects.
     */
    data: ProjectCreateManyInput | ProjectCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Project createManyAndReturn
   */
  export type ProjectCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * The data used to create many Projects.
     */
    data: ProjectCreateManyInput | ProjectCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Project update
   */
  export type ProjectUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * The data needed to update a Project.
     */
    data: XOR<ProjectUpdateInput, ProjectUncheckedUpdateInput>
    /**
     * Choose, which Project to update.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project updateMany
   */
  export type ProjectUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Projects.
     */
    data: XOR<ProjectUpdateManyMutationInput, ProjectUncheckedUpdateManyInput>
    /**
     * Filter which Projects to update
     */
    where?: ProjectWhereInput
    /**
     * Limit how many Projects to update.
     */
    limit?: number
  }

  /**
   * Project updateManyAndReturn
   */
  export type ProjectUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * The data used to update Projects.
     */
    data: XOR<ProjectUpdateManyMutationInput, ProjectUncheckedUpdateManyInput>
    /**
     * Filter which Projects to update
     */
    where?: ProjectWhereInput
    /**
     * Limit how many Projects to update.
     */
    limit?: number
  }

  /**
   * Project upsert
   */
  export type ProjectUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * The filter to search for the Project to update in case it exists.
     */
    where: ProjectWhereUniqueInput
    /**
     * In case the Project found by the `where` argument doesn't exist, create a new Project with this data.
     */
    create: XOR<ProjectCreateInput, ProjectUncheckedCreateInput>
    /**
     * In case the Project was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProjectUpdateInput, ProjectUncheckedUpdateInput>
  }

  /**
   * Project delete
   */
  export type ProjectDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter which Project to delete.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project deleteMany
   */
  export type ProjectDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Projects to delete
     */
    where?: ProjectWhereInput
    /**
     * Limit how many Projects to delete.
     */
    limit?: number
  }

  /**
   * Project.Asset
   */
  export type Project$AssetArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Asset
     */
    select?: AssetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Asset
     */
    omit?: AssetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssetInclude<ExtArgs> | null
    where?: AssetWhereInput
    orderBy?: AssetOrderByWithRelationInput | AssetOrderByWithRelationInput[]
    cursor?: AssetWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AssetScalarFieldEnum | AssetScalarFieldEnum[]
  }

  /**
   * Project.AudioAsset
   */
  export type Project$AudioAssetArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AudioAsset
     */
    select?: AudioAssetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AudioAsset
     */
    omit?: AudioAssetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AudioAssetInclude<ExtArgs> | null
    where?: AudioAssetWhereInput
    orderBy?: AudioAssetOrderByWithRelationInput | AudioAssetOrderByWithRelationInput[]
    cursor?: AudioAssetWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AudioAssetScalarFieldEnum | AudioAssetScalarFieldEnum[]
  }

  /**
   * Project.Job
   */
  export type Project$JobArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Job
     */
    select?: JobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Job
     */
    omit?: JobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobInclude<ExtArgs> | null
    where?: JobWhereInput
    orderBy?: JobOrderByWithRelationInput | JobOrderByWithRelationInput[]
    cursor?: JobWhereUniqueInput
    take?: number
    skip?: number
    distinct?: JobScalarFieldEnum | JobScalarFieldEnum[]
  }

  /**
   * Project.Scene
   */
  export type Project$SceneArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Scene
     */
    select?: SceneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Scene
     */
    omit?: SceneOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SceneInclude<ExtArgs> | null
    where?: SceneWhereInput
    orderBy?: SceneOrderByWithRelationInput | SceneOrderByWithRelationInput[]
    cursor?: SceneWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SceneScalarFieldEnum | SceneScalarFieldEnum[]
  }

  /**
   * Project without action
   */
  export type ProjectDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
  }


  /**
   * Model Scene
   */

  export type AggregateScene = {
    _count: SceneCountAggregateOutputType | null
    _avg: SceneAvgAggregateOutputType | null
    _sum: SceneSumAggregateOutputType | null
    _min: SceneMinAggregateOutputType | null
    _max: SceneMaxAggregateOutputType | null
  }

  export type SceneAvgAggregateOutputType = {
    sceneNumber: number | null
    durationSeconds: number | null
  }

  export type SceneSumAggregateOutputType = {
    sceneNumber: number | null
    durationSeconds: number | null
  }

  export type SceneMinAggregateOutputType = {
    id: string | null
    projectId: string | null
    sceneNumber: number | null
    title: string | null
    setting: string | null
    timeOfDay: string | null
    action: string | null
    voiceOver: string | null
    musicMood: string | null
    imagePrompt: string | null
    videoPrompt: string | null
    cameraAngle: string | null
    transition: string | null
    storyboardUrl: string | null
    clipUrl: string | null
    durationSeconds: number | null
    status: $Enums.JobStatus | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SceneMaxAggregateOutputType = {
    id: string | null
    projectId: string | null
    sceneNumber: number | null
    title: string | null
    setting: string | null
    timeOfDay: string | null
    action: string | null
    voiceOver: string | null
    musicMood: string | null
    imagePrompt: string | null
    videoPrompt: string | null
    cameraAngle: string | null
    transition: string | null
    storyboardUrl: string | null
    clipUrl: string | null
    durationSeconds: number | null
    status: $Enums.JobStatus | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SceneCountAggregateOutputType = {
    id: number
    projectId: number
    sceneNumber: number
    title: number
    setting: number
    timeOfDay: number
    action: number
    voiceOver: number
    musicMood: number
    actors: number
    imagePrompt: number
    videoPrompt: number
    cameraAngle: number
    transition: number
    storyboardUrl: number
    clipUrl: number
    durationSeconds: number
    status: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type SceneAvgAggregateInputType = {
    sceneNumber?: true
    durationSeconds?: true
  }

  export type SceneSumAggregateInputType = {
    sceneNumber?: true
    durationSeconds?: true
  }

  export type SceneMinAggregateInputType = {
    id?: true
    projectId?: true
    sceneNumber?: true
    title?: true
    setting?: true
    timeOfDay?: true
    action?: true
    voiceOver?: true
    musicMood?: true
    imagePrompt?: true
    videoPrompt?: true
    cameraAngle?: true
    transition?: true
    storyboardUrl?: true
    clipUrl?: true
    durationSeconds?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SceneMaxAggregateInputType = {
    id?: true
    projectId?: true
    sceneNumber?: true
    title?: true
    setting?: true
    timeOfDay?: true
    action?: true
    voiceOver?: true
    musicMood?: true
    imagePrompt?: true
    videoPrompt?: true
    cameraAngle?: true
    transition?: true
    storyboardUrl?: true
    clipUrl?: true
    durationSeconds?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SceneCountAggregateInputType = {
    id?: true
    projectId?: true
    sceneNumber?: true
    title?: true
    setting?: true
    timeOfDay?: true
    action?: true
    voiceOver?: true
    musicMood?: true
    actors?: true
    imagePrompt?: true
    videoPrompt?: true
    cameraAngle?: true
    transition?: true
    storyboardUrl?: true
    clipUrl?: true
    durationSeconds?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type SceneAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Scene to aggregate.
     */
    where?: SceneWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Scenes to fetch.
     */
    orderBy?: SceneOrderByWithRelationInput | SceneOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SceneWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Scenes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Scenes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Scenes
    **/
    _count?: true | SceneCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SceneAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SceneSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SceneMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SceneMaxAggregateInputType
  }

  export type GetSceneAggregateType<T extends SceneAggregateArgs> = {
        [P in keyof T & keyof AggregateScene]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateScene[P]>
      : GetScalarType<T[P], AggregateScene[P]>
  }




  export type SceneGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SceneWhereInput
    orderBy?: SceneOrderByWithAggregationInput | SceneOrderByWithAggregationInput[]
    by: SceneScalarFieldEnum[] | SceneScalarFieldEnum
    having?: SceneScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SceneCountAggregateInputType | true
    _avg?: SceneAvgAggregateInputType
    _sum?: SceneSumAggregateInputType
    _min?: SceneMinAggregateInputType
    _max?: SceneMaxAggregateInputType
  }

  export type SceneGroupByOutputType = {
    id: string
    projectId: string
    sceneNumber: number
    title: string
    setting: string
    timeOfDay: string | null
    action: string
    voiceOver: string
    musicMood: string | null
    actors: string[]
    imagePrompt: string | null
    videoPrompt: string | null
    cameraAngle: string | null
    transition: string | null
    storyboardUrl: string | null
    clipUrl: string | null
    durationSeconds: number
    status: $Enums.JobStatus
    createdAt: Date
    updatedAt: Date
    _count: SceneCountAggregateOutputType | null
    _avg: SceneAvgAggregateOutputType | null
    _sum: SceneSumAggregateOutputType | null
    _min: SceneMinAggregateOutputType | null
    _max: SceneMaxAggregateOutputType | null
  }

  type GetSceneGroupByPayload<T extends SceneGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SceneGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SceneGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SceneGroupByOutputType[P]>
            : GetScalarType<T[P], SceneGroupByOutputType[P]>
        }
      >
    >


  export type SceneSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projectId?: boolean
    sceneNumber?: boolean
    title?: boolean
    setting?: boolean
    timeOfDay?: boolean
    action?: boolean
    voiceOver?: boolean
    musicMood?: boolean
    actors?: boolean
    imagePrompt?: boolean
    videoPrompt?: boolean
    cameraAngle?: boolean
    transition?: boolean
    storyboardUrl?: boolean
    clipUrl?: boolean
    durationSeconds?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    Project?: boolean | ProjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["scene"]>

  export type SceneSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projectId?: boolean
    sceneNumber?: boolean
    title?: boolean
    setting?: boolean
    timeOfDay?: boolean
    action?: boolean
    voiceOver?: boolean
    musicMood?: boolean
    actors?: boolean
    imagePrompt?: boolean
    videoPrompt?: boolean
    cameraAngle?: boolean
    transition?: boolean
    storyboardUrl?: boolean
    clipUrl?: boolean
    durationSeconds?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    Project?: boolean | ProjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["scene"]>

  export type SceneSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projectId?: boolean
    sceneNumber?: boolean
    title?: boolean
    setting?: boolean
    timeOfDay?: boolean
    action?: boolean
    voiceOver?: boolean
    musicMood?: boolean
    actors?: boolean
    imagePrompt?: boolean
    videoPrompt?: boolean
    cameraAngle?: boolean
    transition?: boolean
    storyboardUrl?: boolean
    clipUrl?: boolean
    durationSeconds?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    Project?: boolean | ProjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["scene"]>

  export type SceneSelectScalar = {
    id?: boolean
    projectId?: boolean
    sceneNumber?: boolean
    title?: boolean
    setting?: boolean
    timeOfDay?: boolean
    action?: boolean
    voiceOver?: boolean
    musicMood?: boolean
    actors?: boolean
    imagePrompt?: boolean
    videoPrompt?: boolean
    cameraAngle?: boolean
    transition?: boolean
    storyboardUrl?: boolean
    clipUrl?: boolean
    durationSeconds?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type SceneOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "projectId" | "sceneNumber" | "title" | "setting" | "timeOfDay" | "action" | "voiceOver" | "musicMood" | "actors" | "imagePrompt" | "videoPrompt" | "cameraAngle" | "transition" | "storyboardUrl" | "clipUrl" | "durationSeconds" | "status" | "createdAt" | "updatedAt", ExtArgs["result"]["scene"]>
  export type SceneInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Project?: boolean | ProjectDefaultArgs<ExtArgs>
  }
  export type SceneIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Project?: boolean | ProjectDefaultArgs<ExtArgs>
  }
  export type SceneIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Project?: boolean | ProjectDefaultArgs<ExtArgs>
  }

  export type $ScenePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Scene"
    objects: {
      Project: Prisma.$ProjectPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      projectId: string
      sceneNumber: number
      title: string
      setting: string
      timeOfDay: string | null
      action: string
      voiceOver: string
      musicMood: string | null
      actors: string[]
      imagePrompt: string | null
      videoPrompt: string | null
      cameraAngle: string | null
      transition: string | null
      storyboardUrl: string | null
      clipUrl: string | null
      durationSeconds: number
      status: $Enums.JobStatus
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["scene"]>
    composites: {}
  }

  type SceneGetPayload<S extends boolean | null | undefined | SceneDefaultArgs> = $Result.GetResult<Prisma.$ScenePayload, S>

  type SceneCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SceneFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SceneCountAggregateInputType | true
    }

  export interface SceneDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Scene'], meta: { name: 'Scene' } }
    /**
     * Find zero or one Scene that matches the filter.
     * @param {SceneFindUniqueArgs} args - Arguments to find a Scene
     * @example
     * // Get one Scene
     * const scene = await prisma.scene.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SceneFindUniqueArgs>(args: SelectSubset<T, SceneFindUniqueArgs<ExtArgs>>): Prisma__SceneClient<$Result.GetResult<Prisma.$ScenePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Scene that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SceneFindUniqueOrThrowArgs} args - Arguments to find a Scene
     * @example
     * // Get one Scene
     * const scene = await prisma.scene.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SceneFindUniqueOrThrowArgs>(args: SelectSubset<T, SceneFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SceneClient<$Result.GetResult<Prisma.$ScenePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Scene that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SceneFindFirstArgs} args - Arguments to find a Scene
     * @example
     * // Get one Scene
     * const scene = await prisma.scene.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SceneFindFirstArgs>(args?: SelectSubset<T, SceneFindFirstArgs<ExtArgs>>): Prisma__SceneClient<$Result.GetResult<Prisma.$ScenePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Scene that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SceneFindFirstOrThrowArgs} args - Arguments to find a Scene
     * @example
     * // Get one Scene
     * const scene = await prisma.scene.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SceneFindFirstOrThrowArgs>(args?: SelectSubset<T, SceneFindFirstOrThrowArgs<ExtArgs>>): Prisma__SceneClient<$Result.GetResult<Prisma.$ScenePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Scenes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SceneFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Scenes
     * const scenes = await prisma.scene.findMany()
     * 
     * // Get first 10 Scenes
     * const scenes = await prisma.scene.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sceneWithIdOnly = await prisma.scene.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SceneFindManyArgs>(args?: SelectSubset<T, SceneFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ScenePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Scene.
     * @param {SceneCreateArgs} args - Arguments to create a Scene.
     * @example
     * // Create one Scene
     * const Scene = await prisma.scene.create({
     *   data: {
     *     // ... data to create a Scene
     *   }
     * })
     * 
     */
    create<T extends SceneCreateArgs>(args: SelectSubset<T, SceneCreateArgs<ExtArgs>>): Prisma__SceneClient<$Result.GetResult<Prisma.$ScenePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Scenes.
     * @param {SceneCreateManyArgs} args - Arguments to create many Scenes.
     * @example
     * // Create many Scenes
     * const scene = await prisma.scene.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SceneCreateManyArgs>(args?: SelectSubset<T, SceneCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Scenes and returns the data saved in the database.
     * @param {SceneCreateManyAndReturnArgs} args - Arguments to create many Scenes.
     * @example
     * // Create many Scenes
     * const scene = await prisma.scene.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Scenes and only return the `id`
     * const sceneWithIdOnly = await prisma.scene.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SceneCreateManyAndReturnArgs>(args?: SelectSubset<T, SceneCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ScenePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Scene.
     * @param {SceneDeleteArgs} args - Arguments to delete one Scene.
     * @example
     * // Delete one Scene
     * const Scene = await prisma.scene.delete({
     *   where: {
     *     // ... filter to delete one Scene
     *   }
     * })
     * 
     */
    delete<T extends SceneDeleteArgs>(args: SelectSubset<T, SceneDeleteArgs<ExtArgs>>): Prisma__SceneClient<$Result.GetResult<Prisma.$ScenePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Scene.
     * @param {SceneUpdateArgs} args - Arguments to update one Scene.
     * @example
     * // Update one Scene
     * const scene = await prisma.scene.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SceneUpdateArgs>(args: SelectSubset<T, SceneUpdateArgs<ExtArgs>>): Prisma__SceneClient<$Result.GetResult<Prisma.$ScenePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Scenes.
     * @param {SceneDeleteManyArgs} args - Arguments to filter Scenes to delete.
     * @example
     * // Delete a few Scenes
     * const { count } = await prisma.scene.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SceneDeleteManyArgs>(args?: SelectSubset<T, SceneDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Scenes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SceneUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Scenes
     * const scene = await prisma.scene.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SceneUpdateManyArgs>(args: SelectSubset<T, SceneUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Scenes and returns the data updated in the database.
     * @param {SceneUpdateManyAndReturnArgs} args - Arguments to update many Scenes.
     * @example
     * // Update many Scenes
     * const scene = await prisma.scene.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Scenes and only return the `id`
     * const sceneWithIdOnly = await prisma.scene.updateManyAndReturn({
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
    updateManyAndReturn<T extends SceneUpdateManyAndReturnArgs>(args: SelectSubset<T, SceneUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ScenePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Scene.
     * @param {SceneUpsertArgs} args - Arguments to update or create a Scene.
     * @example
     * // Update or create a Scene
     * const scene = await prisma.scene.upsert({
     *   create: {
     *     // ... data to create a Scene
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Scene we want to update
     *   }
     * })
     */
    upsert<T extends SceneUpsertArgs>(args: SelectSubset<T, SceneUpsertArgs<ExtArgs>>): Prisma__SceneClient<$Result.GetResult<Prisma.$ScenePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Scenes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SceneCountArgs} args - Arguments to filter Scenes to count.
     * @example
     * // Count the number of Scenes
     * const count = await prisma.scene.count({
     *   where: {
     *     // ... the filter for the Scenes we want to count
     *   }
     * })
    **/
    count<T extends SceneCountArgs>(
      args?: Subset<T, SceneCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SceneCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Scene.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SceneAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends SceneAggregateArgs>(args: Subset<T, SceneAggregateArgs>): Prisma.PrismaPromise<GetSceneAggregateType<T>>

    /**
     * Group by Scene.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SceneGroupByArgs} args - Group by arguments.
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
      T extends SceneGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SceneGroupByArgs['orderBy'] }
        : { orderBy?: SceneGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, SceneGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSceneGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Scene model
   */
  readonly fields: SceneFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Scene.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SceneClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    Project<T extends ProjectDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProjectDefaultArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Scene model
   */
  interface SceneFieldRefs {
    readonly id: FieldRef<"Scene", 'String'>
    readonly projectId: FieldRef<"Scene", 'String'>
    readonly sceneNumber: FieldRef<"Scene", 'Int'>
    readonly title: FieldRef<"Scene", 'String'>
    readonly setting: FieldRef<"Scene", 'String'>
    readonly timeOfDay: FieldRef<"Scene", 'String'>
    readonly action: FieldRef<"Scene", 'String'>
    readonly voiceOver: FieldRef<"Scene", 'String'>
    readonly musicMood: FieldRef<"Scene", 'String'>
    readonly actors: FieldRef<"Scene", 'String[]'>
    readonly imagePrompt: FieldRef<"Scene", 'String'>
    readonly videoPrompt: FieldRef<"Scene", 'String'>
    readonly cameraAngle: FieldRef<"Scene", 'String'>
    readonly transition: FieldRef<"Scene", 'String'>
    readonly storyboardUrl: FieldRef<"Scene", 'String'>
    readonly clipUrl: FieldRef<"Scene", 'String'>
    readonly durationSeconds: FieldRef<"Scene", 'Int'>
    readonly status: FieldRef<"Scene", 'JobStatus'>
    readonly createdAt: FieldRef<"Scene", 'DateTime'>
    readonly updatedAt: FieldRef<"Scene", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Scene findUnique
   */
  export type SceneFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Scene
     */
    select?: SceneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Scene
     */
    omit?: SceneOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SceneInclude<ExtArgs> | null
    /**
     * Filter, which Scene to fetch.
     */
    where: SceneWhereUniqueInput
  }

  /**
   * Scene findUniqueOrThrow
   */
  export type SceneFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Scene
     */
    select?: SceneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Scene
     */
    omit?: SceneOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SceneInclude<ExtArgs> | null
    /**
     * Filter, which Scene to fetch.
     */
    where: SceneWhereUniqueInput
  }

  /**
   * Scene findFirst
   */
  export type SceneFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Scene
     */
    select?: SceneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Scene
     */
    omit?: SceneOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SceneInclude<ExtArgs> | null
    /**
     * Filter, which Scene to fetch.
     */
    where?: SceneWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Scenes to fetch.
     */
    orderBy?: SceneOrderByWithRelationInput | SceneOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Scenes.
     */
    cursor?: SceneWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Scenes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Scenes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Scenes.
     */
    distinct?: SceneScalarFieldEnum | SceneScalarFieldEnum[]
  }

  /**
   * Scene findFirstOrThrow
   */
  export type SceneFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Scene
     */
    select?: SceneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Scene
     */
    omit?: SceneOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SceneInclude<ExtArgs> | null
    /**
     * Filter, which Scene to fetch.
     */
    where?: SceneWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Scenes to fetch.
     */
    orderBy?: SceneOrderByWithRelationInput | SceneOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Scenes.
     */
    cursor?: SceneWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Scenes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Scenes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Scenes.
     */
    distinct?: SceneScalarFieldEnum | SceneScalarFieldEnum[]
  }

  /**
   * Scene findMany
   */
  export type SceneFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Scene
     */
    select?: SceneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Scene
     */
    omit?: SceneOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SceneInclude<ExtArgs> | null
    /**
     * Filter, which Scenes to fetch.
     */
    where?: SceneWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Scenes to fetch.
     */
    orderBy?: SceneOrderByWithRelationInput | SceneOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Scenes.
     */
    cursor?: SceneWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Scenes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Scenes.
     */
    skip?: number
    distinct?: SceneScalarFieldEnum | SceneScalarFieldEnum[]
  }

  /**
   * Scene create
   */
  export type SceneCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Scene
     */
    select?: SceneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Scene
     */
    omit?: SceneOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SceneInclude<ExtArgs> | null
    /**
     * The data needed to create a Scene.
     */
    data: XOR<SceneCreateInput, SceneUncheckedCreateInput>
  }

  /**
   * Scene createMany
   */
  export type SceneCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Scenes.
     */
    data: SceneCreateManyInput | SceneCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Scene createManyAndReturn
   */
  export type SceneCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Scene
     */
    select?: SceneSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Scene
     */
    omit?: SceneOmit<ExtArgs> | null
    /**
     * The data used to create many Scenes.
     */
    data: SceneCreateManyInput | SceneCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SceneIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Scene update
   */
  export type SceneUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Scene
     */
    select?: SceneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Scene
     */
    omit?: SceneOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SceneInclude<ExtArgs> | null
    /**
     * The data needed to update a Scene.
     */
    data: XOR<SceneUpdateInput, SceneUncheckedUpdateInput>
    /**
     * Choose, which Scene to update.
     */
    where: SceneWhereUniqueInput
  }

  /**
   * Scene updateMany
   */
  export type SceneUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Scenes.
     */
    data: XOR<SceneUpdateManyMutationInput, SceneUncheckedUpdateManyInput>
    /**
     * Filter which Scenes to update
     */
    where?: SceneWhereInput
    /**
     * Limit how many Scenes to update.
     */
    limit?: number
  }

  /**
   * Scene updateManyAndReturn
   */
  export type SceneUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Scene
     */
    select?: SceneSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Scene
     */
    omit?: SceneOmit<ExtArgs> | null
    /**
     * The data used to update Scenes.
     */
    data: XOR<SceneUpdateManyMutationInput, SceneUncheckedUpdateManyInput>
    /**
     * Filter which Scenes to update
     */
    where?: SceneWhereInput
    /**
     * Limit how many Scenes to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SceneIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Scene upsert
   */
  export type SceneUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Scene
     */
    select?: SceneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Scene
     */
    omit?: SceneOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SceneInclude<ExtArgs> | null
    /**
     * The filter to search for the Scene to update in case it exists.
     */
    where: SceneWhereUniqueInput
    /**
     * In case the Scene found by the `where` argument doesn't exist, create a new Scene with this data.
     */
    create: XOR<SceneCreateInput, SceneUncheckedCreateInput>
    /**
     * In case the Scene was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SceneUpdateInput, SceneUncheckedUpdateInput>
  }

  /**
   * Scene delete
   */
  export type SceneDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Scene
     */
    select?: SceneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Scene
     */
    omit?: SceneOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SceneInclude<ExtArgs> | null
    /**
     * Filter which Scene to delete.
     */
    where: SceneWhereUniqueInput
  }

  /**
   * Scene deleteMany
   */
  export type SceneDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Scenes to delete
     */
    where?: SceneWhereInput
    /**
     * Limit how many Scenes to delete.
     */
    limit?: number
  }

  /**
   * Scene without action
   */
  export type SceneDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Scene
     */
    select?: SceneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Scene
     */
    omit?: SceneOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SceneInclude<ExtArgs> | null
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


  export const AssetScalarFieldEnum: {
    id: 'id',
    projectId: 'projectId',
    type: 'type',
    name: 'name',
    description: 'description',
    imagePrompt: 'imagePrompt',
    imageUrl: 'imageUrl',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AssetScalarFieldEnum = (typeof AssetScalarFieldEnum)[keyof typeof AssetScalarFieldEnum]


  export const AudioAssetScalarFieldEnum: {
    id: 'id',
    projectId: 'projectId',
    type: 'type',
    sunoPrompt: 'sunoPrompt',
    sunoJobId: 'sunoJobId',
    audioUrl: 'audioUrl',
    lyrics: 'lyrics',
    mood: 'mood',
    genre: 'genre',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AudioAssetScalarFieldEnum = (typeof AudioAssetScalarFieldEnum)[keyof typeof AudioAssetScalarFieldEnum]


  export const JobScalarFieldEnum: {
    id: 'id',
    projectId: 'projectId',
    type: 'type',
    status: 'status',
    payload: 'payload',
    result: 'result',
    error: 'error',
    attempts: 'attempts',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type JobScalarFieldEnum = (typeof JobScalarFieldEnum)[keyof typeof JobScalarFieldEnum]


  export const ProjectScalarFieldEnum: {
    id: 'id',
    title: 'title',
    status: 'status',
    ide: 'ide',
    gaya: 'gaya',
    tokohUtama: 'tokohUtama',
    asalDaerah: 'asalDaerah',
    latar: 'latar',
    latarDetail: 'latarDetail',
    plot: 'plot',
    screenplay: 'screenplay',
    finalVideoUrl: 'finalVideoUrl',
    driveFileId: 'driveFileId',
    driveShareLink: 'driveShareLink',
    totalScenes: 'totalScenes',
    completedScenes: 'completedScenes',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ProjectScalarFieldEnum = (typeof ProjectScalarFieldEnum)[keyof typeof ProjectScalarFieldEnum]


  export const SceneScalarFieldEnum: {
    id: 'id',
    projectId: 'projectId',
    sceneNumber: 'sceneNumber',
    title: 'title',
    setting: 'setting',
    timeOfDay: 'timeOfDay',
    action: 'action',
    voiceOver: 'voiceOver',
    musicMood: 'musicMood',
    actors: 'actors',
    imagePrompt: 'imagePrompt',
    videoPrompt: 'videoPrompt',
    cameraAngle: 'cameraAngle',
    transition: 'transition',
    storyboardUrl: 'storyboardUrl',
    clipUrl: 'clipUrl',
    durationSeconds: 'durationSeconds',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type SceneScalarFieldEnum = (typeof SceneScalarFieldEnum)[keyof typeof SceneScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


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
   * Reference to a field of type 'AssetType'
   */
  export type EnumAssetTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AssetType'>
    


  /**
   * Reference to a field of type 'AssetType[]'
   */
  export type ListEnumAssetTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AssetType[]'>
    


  /**
   * Reference to a field of type 'JobStatus'
   */
  export type EnumJobStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'JobStatus'>
    


  /**
   * Reference to a field of type 'JobStatus[]'
   */
  export type ListEnumJobStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'JobStatus[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'AudioType'
   */
  export type EnumAudioTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AudioType'>
    


  /**
   * Reference to a field of type 'AudioType[]'
   */
  export type ListEnumAudioTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AudioType[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'ProjectStatus'
   */
  export type EnumProjectStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ProjectStatus'>
    


  /**
   * Reference to a field of type 'ProjectStatus[]'
   */
  export type ListEnumProjectStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ProjectStatus[]'>
    


  /**
   * Reference to a field of type 'StoryStyle'
   */
  export type EnumStoryStyleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'StoryStyle'>
    


  /**
   * Reference to a field of type 'StoryStyle[]'
   */
  export type ListEnumStoryStyleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'StoryStyle[]'>
    


  /**
   * Reference to a field of type 'HistoricalEra'
   */
  export type EnumHistoricalEraFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'HistoricalEra'>
    


  /**
   * Reference to a field of type 'HistoricalEra[]'
   */
  export type ListEnumHistoricalEraFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'HistoricalEra[]'>
    


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


  export type AssetWhereInput = {
    AND?: AssetWhereInput | AssetWhereInput[]
    OR?: AssetWhereInput[]
    NOT?: AssetWhereInput | AssetWhereInput[]
    id?: StringFilter<"Asset"> | string
    projectId?: StringFilter<"Asset"> | string
    type?: EnumAssetTypeFilter<"Asset"> | $Enums.AssetType
    name?: StringFilter<"Asset"> | string
    description?: StringFilter<"Asset"> | string
    imagePrompt?: StringFilter<"Asset"> | string
    imageUrl?: StringNullableFilter<"Asset"> | string | null
    status?: EnumJobStatusFilter<"Asset"> | $Enums.JobStatus
    createdAt?: DateTimeFilter<"Asset"> | Date | string
    updatedAt?: DateTimeFilter<"Asset"> | Date | string
    Project?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
  }

  export type AssetOrderByWithRelationInput = {
    id?: SortOrder
    projectId?: SortOrder
    type?: SortOrder
    name?: SortOrder
    description?: SortOrder
    imagePrompt?: SortOrder
    imageUrl?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    Project?: ProjectOrderByWithRelationInput
  }

  export type AssetWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AssetWhereInput | AssetWhereInput[]
    OR?: AssetWhereInput[]
    NOT?: AssetWhereInput | AssetWhereInput[]
    projectId?: StringFilter<"Asset"> | string
    type?: EnumAssetTypeFilter<"Asset"> | $Enums.AssetType
    name?: StringFilter<"Asset"> | string
    description?: StringFilter<"Asset"> | string
    imagePrompt?: StringFilter<"Asset"> | string
    imageUrl?: StringNullableFilter<"Asset"> | string | null
    status?: EnumJobStatusFilter<"Asset"> | $Enums.JobStatus
    createdAt?: DateTimeFilter<"Asset"> | Date | string
    updatedAt?: DateTimeFilter<"Asset"> | Date | string
    Project?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
  }, "id">

  export type AssetOrderByWithAggregationInput = {
    id?: SortOrder
    projectId?: SortOrder
    type?: SortOrder
    name?: SortOrder
    description?: SortOrder
    imagePrompt?: SortOrder
    imageUrl?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AssetCountOrderByAggregateInput
    _max?: AssetMaxOrderByAggregateInput
    _min?: AssetMinOrderByAggregateInput
  }

  export type AssetScalarWhereWithAggregatesInput = {
    AND?: AssetScalarWhereWithAggregatesInput | AssetScalarWhereWithAggregatesInput[]
    OR?: AssetScalarWhereWithAggregatesInput[]
    NOT?: AssetScalarWhereWithAggregatesInput | AssetScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Asset"> | string
    projectId?: StringWithAggregatesFilter<"Asset"> | string
    type?: EnumAssetTypeWithAggregatesFilter<"Asset"> | $Enums.AssetType
    name?: StringWithAggregatesFilter<"Asset"> | string
    description?: StringWithAggregatesFilter<"Asset"> | string
    imagePrompt?: StringWithAggregatesFilter<"Asset"> | string
    imageUrl?: StringNullableWithAggregatesFilter<"Asset"> | string | null
    status?: EnumJobStatusWithAggregatesFilter<"Asset"> | $Enums.JobStatus
    createdAt?: DateTimeWithAggregatesFilter<"Asset"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Asset"> | Date | string
  }

  export type AudioAssetWhereInput = {
    AND?: AudioAssetWhereInput | AudioAssetWhereInput[]
    OR?: AudioAssetWhereInput[]
    NOT?: AudioAssetWhereInput | AudioAssetWhereInput[]
    id?: StringFilter<"AudioAsset"> | string
    projectId?: StringFilter<"AudioAsset"> | string
    type?: EnumAudioTypeFilter<"AudioAsset"> | $Enums.AudioType
    sunoPrompt?: StringFilter<"AudioAsset"> | string
    sunoJobId?: StringNullableFilter<"AudioAsset"> | string | null
    audioUrl?: StringNullableFilter<"AudioAsset"> | string | null
    lyrics?: StringNullableFilter<"AudioAsset"> | string | null
    mood?: StringNullableFilter<"AudioAsset"> | string | null
    genre?: StringNullableFilter<"AudioAsset"> | string | null
    status?: EnumJobStatusFilter<"AudioAsset"> | $Enums.JobStatus
    createdAt?: DateTimeFilter<"AudioAsset"> | Date | string
    updatedAt?: DateTimeFilter<"AudioAsset"> | Date | string
    Project?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
  }

  export type AudioAssetOrderByWithRelationInput = {
    id?: SortOrder
    projectId?: SortOrder
    type?: SortOrder
    sunoPrompt?: SortOrder
    sunoJobId?: SortOrderInput | SortOrder
    audioUrl?: SortOrderInput | SortOrder
    lyrics?: SortOrderInput | SortOrder
    mood?: SortOrderInput | SortOrder
    genre?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    Project?: ProjectOrderByWithRelationInput
  }

  export type AudioAssetWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AudioAssetWhereInput | AudioAssetWhereInput[]
    OR?: AudioAssetWhereInput[]
    NOT?: AudioAssetWhereInput | AudioAssetWhereInput[]
    projectId?: StringFilter<"AudioAsset"> | string
    type?: EnumAudioTypeFilter<"AudioAsset"> | $Enums.AudioType
    sunoPrompt?: StringFilter<"AudioAsset"> | string
    sunoJobId?: StringNullableFilter<"AudioAsset"> | string | null
    audioUrl?: StringNullableFilter<"AudioAsset"> | string | null
    lyrics?: StringNullableFilter<"AudioAsset"> | string | null
    mood?: StringNullableFilter<"AudioAsset"> | string | null
    genre?: StringNullableFilter<"AudioAsset"> | string | null
    status?: EnumJobStatusFilter<"AudioAsset"> | $Enums.JobStatus
    createdAt?: DateTimeFilter<"AudioAsset"> | Date | string
    updatedAt?: DateTimeFilter<"AudioAsset"> | Date | string
    Project?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
  }, "id">

  export type AudioAssetOrderByWithAggregationInput = {
    id?: SortOrder
    projectId?: SortOrder
    type?: SortOrder
    sunoPrompt?: SortOrder
    sunoJobId?: SortOrderInput | SortOrder
    audioUrl?: SortOrderInput | SortOrder
    lyrics?: SortOrderInput | SortOrder
    mood?: SortOrderInput | SortOrder
    genre?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AudioAssetCountOrderByAggregateInput
    _max?: AudioAssetMaxOrderByAggregateInput
    _min?: AudioAssetMinOrderByAggregateInput
  }

  export type AudioAssetScalarWhereWithAggregatesInput = {
    AND?: AudioAssetScalarWhereWithAggregatesInput | AudioAssetScalarWhereWithAggregatesInput[]
    OR?: AudioAssetScalarWhereWithAggregatesInput[]
    NOT?: AudioAssetScalarWhereWithAggregatesInput | AudioAssetScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AudioAsset"> | string
    projectId?: StringWithAggregatesFilter<"AudioAsset"> | string
    type?: EnumAudioTypeWithAggregatesFilter<"AudioAsset"> | $Enums.AudioType
    sunoPrompt?: StringWithAggregatesFilter<"AudioAsset"> | string
    sunoJobId?: StringNullableWithAggregatesFilter<"AudioAsset"> | string | null
    audioUrl?: StringNullableWithAggregatesFilter<"AudioAsset"> | string | null
    lyrics?: StringNullableWithAggregatesFilter<"AudioAsset"> | string | null
    mood?: StringNullableWithAggregatesFilter<"AudioAsset"> | string | null
    genre?: StringNullableWithAggregatesFilter<"AudioAsset"> | string | null
    status?: EnumJobStatusWithAggregatesFilter<"AudioAsset"> | $Enums.JobStatus
    createdAt?: DateTimeWithAggregatesFilter<"AudioAsset"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"AudioAsset"> | Date | string
  }

  export type JobWhereInput = {
    AND?: JobWhereInput | JobWhereInput[]
    OR?: JobWhereInput[]
    NOT?: JobWhereInput | JobWhereInput[]
    id?: StringFilter<"Job"> | string
    projectId?: StringFilter<"Job"> | string
    type?: StringFilter<"Job"> | string
    status?: EnumJobStatusFilter<"Job"> | $Enums.JobStatus
    payload?: JsonNullableFilter<"Job">
    result?: JsonNullableFilter<"Job">
    error?: StringNullableFilter<"Job"> | string | null
    attempts?: IntFilter<"Job"> | number
    createdAt?: DateTimeFilter<"Job"> | Date | string
    updatedAt?: DateTimeFilter<"Job"> | Date | string
    Project?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
  }

  export type JobOrderByWithRelationInput = {
    id?: SortOrder
    projectId?: SortOrder
    type?: SortOrder
    status?: SortOrder
    payload?: SortOrderInput | SortOrder
    result?: SortOrderInput | SortOrder
    error?: SortOrderInput | SortOrder
    attempts?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    Project?: ProjectOrderByWithRelationInput
  }

  export type JobWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: JobWhereInput | JobWhereInput[]
    OR?: JobWhereInput[]
    NOT?: JobWhereInput | JobWhereInput[]
    projectId?: StringFilter<"Job"> | string
    type?: StringFilter<"Job"> | string
    status?: EnumJobStatusFilter<"Job"> | $Enums.JobStatus
    payload?: JsonNullableFilter<"Job">
    result?: JsonNullableFilter<"Job">
    error?: StringNullableFilter<"Job"> | string | null
    attempts?: IntFilter<"Job"> | number
    createdAt?: DateTimeFilter<"Job"> | Date | string
    updatedAt?: DateTimeFilter<"Job"> | Date | string
    Project?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
  }, "id">

  export type JobOrderByWithAggregationInput = {
    id?: SortOrder
    projectId?: SortOrder
    type?: SortOrder
    status?: SortOrder
    payload?: SortOrderInput | SortOrder
    result?: SortOrderInput | SortOrder
    error?: SortOrderInput | SortOrder
    attempts?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: JobCountOrderByAggregateInput
    _avg?: JobAvgOrderByAggregateInput
    _max?: JobMaxOrderByAggregateInput
    _min?: JobMinOrderByAggregateInput
    _sum?: JobSumOrderByAggregateInput
  }

  export type JobScalarWhereWithAggregatesInput = {
    AND?: JobScalarWhereWithAggregatesInput | JobScalarWhereWithAggregatesInput[]
    OR?: JobScalarWhereWithAggregatesInput[]
    NOT?: JobScalarWhereWithAggregatesInput | JobScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Job"> | string
    projectId?: StringWithAggregatesFilter<"Job"> | string
    type?: StringWithAggregatesFilter<"Job"> | string
    status?: EnumJobStatusWithAggregatesFilter<"Job"> | $Enums.JobStatus
    payload?: JsonNullableWithAggregatesFilter<"Job">
    result?: JsonNullableWithAggregatesFilter<"Job">
    error?: StringNullableWithAggregatesFilter<"Job"> | string | null
    attempts?: IntWithAggregatesFilter<"Job"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Job"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Job"> | Date | string
  }

  export type ProjectWhereInput = {
    AND?: ProjectWhereInput | ProjectWhereInput[]
    OR?: ProjectWhereInput[]
    NOT?: ProjectWhereInput | ProjectWhereInput[]
    id?: StringFilter<"Project"> | string
    title?: StringFilter<"Project"> | string
    status?: EnumProjectStatusFilter<"Project"> | $Enums.ProjectStatus
    ide?: StringFilter<"Project"> | string
    gaya?: EnumStoryStyleFilter<"Project"> | $Enums.StoryStyle
    tokohUtama?: StringFilter<"Project"> | string
    asalDaerah?: StringFilter<"Project"> | string
    latar?: EnumHistoricalEraFilter<"Project"> | $Enums.HistoricalEra
    latarDetail?: StringNullableFilter<"Project"> | string | null
    plot?: StringFilter<"Project"> | string
    screenplay?: JsonNullableFilter<"Project">
    finalVideoUrl?: StringNullableFilter<"Project"> | string | null
    driveFileId?: StringNullableFilter<"Project"> | string | null
    driveShareLink?: StringNullableFilter<"Project"> | string | null
    totalScenes?: IntFilter<"Project"> | number
    completedScenes?: IntFilter<"Project"> | number
    createdAt?: DateTimeFilter<"Project"> | Date | string
    updatedAt?: DateTimeFilter<"Project"> | Date | string
    Asset?: AssetListRelationFilter
    AudioAsset?: AudioAssetListRelationFilter
    Job?: JobListRelationFilter
    Scene?: SceneListRelationFilter
  }

  export type ProjectOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    status?: SortOrder
    ide?: SortOrder
    gaya?: SortOrder
    tokohUtama?: SortOrder
    asalDaerah?: SortOrder
    latar?: SortOrder
    latarDetail?: SortOrderInput | SortOrder
    plot?: SortOrder
    screenplay?: SortOrderInput | SortOrder
    finalVideoUrl?: SortOrderInput | SortOrder
    driveFileId?: SortOrderInput | SortOrder
    driveShareLink?: SortOrderInput | SortOrder
    totalScenes?: SortOrder
    completedScenes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    Asset?: AssetOrderByRelationAggregateInput
    AudioAsset?: AudioAssetOrderByRelationAggregateInput
    Job?: JobOrderByRelationAggregateInput
    Scene?: SceneOrderByRelationAggregateInput
  }

  export type ProjectWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ProjectWhereInput | ProjectWhereInput[]
    OR?: ProjectWhereInput[]
    NOT?: ProjectWhereInput | ProjectWhereInput[]
    title?: StringFilter<"Project"> | string
    status?: EnumProjectStatusFilter<"Project"> | $Enums.ProjectStatus
    ide?: StringFilter<"Project"> | string
    gaya?: EnumStoryStyleFilter<"Project"> | $Enums.StoryStyle
    tokohUtama?: StringFilter<"Project"> | string
    asalDaerah?: StringFilter<"Project"> | string
    latar?: EnumHistoricalEraFilter<"Project"> | $Enums.HistoricalEra
    latarDetail?: StringNullableFilter<"Project"> | string | null
    plot?: StringFilter<"Project"> | string
    screenplay?: JsonNullableFilter<"Project">
    finalVideoUrl?: StringNullableFilter<"Project"> | string | null
    driveFileId?: StringNullableFilter<"Project"> | string | null
    driveShareLink?: StringNullableFilter<"Project"> | string | null
    totalScenes?: IntFilter<"Project"> | number
    completedScenes?: IntFilter<"Project"> | number
    createdAt?: DateTimeFilter<"Project"> | Date | string
    updatedAt?: DateTimeFilter<"Project"> | Date | string
    Asset?: AssetListRelationFilter
    AudioAsset?: AudioAssetListRelationFilter
    Job?: JobListRelationFilter
    Scene?: SceneListRelationFilter
  }, "id">

  export type ProjectOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    status?: SortOrder
    ide?: SortOrder
    gaya?: SortOrder
    tokohUtama?: SortOrder
    asalDaerah?: SortOrder
    latar?: SortOrder
    latarDetail?: SortOrderInput | SortOrder
    plot?: SortOrder
    screenplay?: SortOrderInput | SortOrder
    finalVideoUrl?: SortOrderInput | SortOrder
    driveFileId?: SortOrderInput | SortOrder
    driveShareLink?: SortOrderInput | SortOrder
    totalScenes?: SortOrder
    completedScenes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ProjectCountOrderByAggregateInput
    _avg?: ProjectAvgOrderByAggregateInput
    _max?: ProjectMaxOrderByAggregateInput
    _min?: ProjectMinOrderByAggregateInput
    _sum?: ProjectSumOrderByAggregateInput
  }

  export type ProjectScalarWhereWithAggregatesInput = {
    AND?: ProjectScalarWhereWithAggregatesInput | ProjectScalarWhereWithAggregatesInput[]
    OR?: ProjectScalarWhereWithAggregatesInput[]
    NOT?: ProjectScalarWhereWithAggregatesInput | ProjectScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Project"> | string
    title?: StringWithAggregatesFilter<"Project"> | string
    status?: EnumProjectStatusWithAggregatesFilter<"Project"> | $Enums.ProjectStatus
    ide?: StringWithAggregatesFilter<"Project"> | string
    gaya?: EnumStoryStyleWithAggregatesFilter<"Project"> | $Enums.StoryStyle
    tokohUtama?: StringWithAggregatesFilter<"Project"> | string
    asalDaerah?: StringWithAggregatesFilter<"Project"> | string
    latar?: EnumHistoricalEraWithAggregatesFilter<"Project"> | $Enums.HistoricalEra
    latarDetail?: StringNullableWithAggregatesFilter<"Project"> | string | null
    plot?: StringWithAggregatesFilter<"Project"> | string
    screenplay?: JsonNullableWithAggregatesFilter<"Project">
    finalVideoUrl?: StringNullableWithAggregatesFilter<"Project"> | string | null
    driveFileId?: StringNullableWithAggregatesFilter<"Project"> | string | null
    driveShareLink?: StringNullableWithAggregatesFilter<"Project"> | string | null
    totalScenes?: IntWithAggregatesFilter<"Project"> | number
    completedScenes?: IntWithAggregatesFilter<"Project"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Project"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Project"> | Date | string
  }

  export type SceneWhereInput = {
    AND?: SceneWhereInput | SceneWhereInput[]
    OR?: SceneWhereInput[]
    NOT?: SceneWhereInput | SceneWhereInput[]
    id?: StringFilter<"Scene"> | string
    projectId?: StringFilter<"Scene"> | string
    sceneNumber?: IntFilter<"Scene"> | number
    title?: StringFilter<"Scene"> | string
    setting?: StringFilter<"Scene"> | string
    timeOfDay?: StringNullableFilter<"Scene"> | string | null
    action?: StringFilter<"Scene"> | string
    voiceOver?: StringFilter<"Scene"> | string
    musicMood?: StringNullableFilter<"Scene"> | string | null
    actors?: StringNullableListFilter<"Scene">
    imagePrompt?: StringNullableFilter<"Scene"> | string | null
    videoPrompt?: StringNullableFilter<"Scene"> | string | null
    cameraAngle?: StringNullableFilter<"Scene"> | string | null
    transition?: StringNullableFilter<"Scene"> | string | null
    storyboardUrl?: StringNullableFilter<"Scene"> | string | null
    clipUrl?: StringNullableFilter<"Scene"> | string | null
    durationSeconds?: IntFilter<"Scene"> | number
    status?: EnumJobStatusFilter<"Scene"> | $Enums.JobStatus
    createdAt?: DateTimeFilter<"Scene"> | Date | string
    updatedAt?: DateTimeFilter<"Scene"> | Date | string
    Project?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
  }

  export type SceneOrderByWithRelationInput = {
    id?: SortOrder
    projectId?: SortOrder
    sceneNumber?: SortOrder
    title?: SortOrder
    setting?: SortOrder
    timeOfDay?: SortOrderInput | SortOrder
    action?: SortOrder
    voiceOver?: SortOrder
    musicMood?: SortOrderInput | SortOrder
    actors?: SortOrder
    imagePrompt?: SortOrderInput | SortOrder
    videoPrompt?: SortOrderInput | SortOrder
    cameraAngle?: SortOrderInput | SortOrder
    transition?: SortOrderInput | SortOrder
    storyboardUrl?: SortOrderInput | SortOrder
    clipUrl?: SortOrderInput | SortOrder
    durationSeconds?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    Project?: ProjectOrderByWithRelationInput
  }

  export type SceneWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    projectId_sceneNumber?: SceneProjectIdSceneNumberCompoundUniqueInput
    AND?: SceneWhereInput | SceneWhereInput[]
    OR?: SceneWhereInput[]
    NOT?: SceneWhereInput | SceneWhereInput[]
    projectId?: StringFilter<"Scene"> | string
    sceneNumber?: IntFilter<"Scene"> | number
    title?: StringFilter<"Scene"> | string
    setting?: StringFilter<"Scene"> | string
    timeOfDay?: StringNullableFilter<"Scene"> | string | null
    action?: StringFilter<"Scene"> | string
    voiceOver?: StringFilter<"Scene"> | string
    musicMood?: StringNullableFilter<"Scene"> | string | null
    actors?: StringNullableListFilter<"Scene">
    imagePrompt?: StringNullableFilter<"Scene"> | string | null
    videoPrompt?: StringNullableFilter<"Scene"> | string | null
    cameraAngle?: StringNullableFilter<"Scene"> | string | null
    transition?: StringNullableFilter<"Scene"> | string | null
    storyboardUrl?: StringNullableFilter<"Scene"> | string | null
    clipUrl?: StringNullableFilter<"Scene"> | string | null
    durationSeconds?: IntFilter<"Scene"> | number
    status?: EnumJobStatusFilter<"Scene"> | $Enums.JobStatus
    createdAt?: DateTimeFilter<"Scene"> | Date | string
    updatedAt?: DateTimeFilter<"Scene"> | Date | string
    Project?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
  }, "id" | "projectId_sceneNumber">

  export type SceneOrderByWithAggregationInput = {
    id?: SortOrder
    projectId?: SortOrder
    sceneNumber?: SortOrder
    title?: SortOrder
    setting?: SortOrder
    timeOfDay?: SortOrderInput | SortOrder
    action?: SortOrder
    voiceOver?: SortOrder
    musicMood?: SortOrderInput | SortOrder
    actors?: SortOrder
    imagePrompt?: SortOrderInput | SortOrder
    videoPrompt?: SortOrderInput | SortOrder
    cameraAngle?: SortOrderInput | SortOrder
    transition?: SortOrderInput | SortOrder
    storyboardUrl?: SortOrderInput | SortOrder
    clipUrl?: SortOrderInput | SortOrder
    durationSeconds?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: SceneCountOrderByAggregateInput
    _avg?: SceneAvgOrderByAggregateInput
    _max?: SceneMaxOrderByAggregateInput
    _min?: SceneMinOrderByAggregateInput
    _sum?: SceneSumOrderByAggregateInput
  }

  export type SceneScalarWhereWithAggregatesInput = {
    AND?: SceneScalarWhereWithAggregatesInput | SceneScalarWhereWithAggregatesInput[]
    OR?: SceneScalarWhereWithAggregatesInput[]
    NOT?: SceneScalarWhereWithAggregatesInput | SceneScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Scene"> | string
    projectId?: StringWithAggregatesFilter<"Scene"> | string
    sceneNumber?: IntWithAggregatesFilter<"Scene"> | number
    title?: StringWithAggregatesFilter<"Scene"> | string
    setting?: StringWithAggregatesFilter<"Scene"> | string
    timeOfDay?: StringNullableWithAggregatesFilter<"Scene"> | string | null
    action?: StringWithAggregatesFilter<"Scene"> | string
    voiceOver?: StringWithAggregatesFilter<"Scene"> | string
    musicMood?: StringNullableWithAggregatesFilter<"Scene"> | string | null
    actors?: StringNullableListFilter<"Scene">
    imagePrompt?: StringNullableWithAggregatesFilter<"Scene"> | string | null
    videoPrompt?: StringNullableWithAggregatesFilter<"Scene"> | string | null
    cameraAngle?: StringNullableWithAggregatesFilter<"Scene"> | string | null
    transition?: StringNullableWithAggregatesFilter<"Scene"> | string | null
    storyboardUrl?: StringNullableWithAggregatesFilter<"Scene"> | string | null
    clipUrl?: StringNullableWithAggregatesFilter<"Scene"> | string | null
    durationSeconds?: IntWithAggregatesFilter<"Scene"> | number
    status?: EnumJobStatusWithAggregatesFilter<"Scene"> | $Enums.JobStatus
    createdAt?: DateTimeWithAggregatesFilter<"Scene"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Scene"> | Date | string
  }

  export type AssetCreateInput = {
    id: string
    type: $Enums.AssetType
    name: string
    description: string
    imagePrompt: string
    imageUrl?: string | null
    status?: $Enums.JobStatus
    createdAt?: Date | string
    updatedAt: Date | string
    Project: ProjectCreateNestedOneWithoutAssetInput
  }

  export type AssetUncheckedCreateInput = {
    id: string
    projectId: string
    type: $Enums.AssetType
    name: string
    description: string
    imagePrompt: string
    imageUrl?: string | null
    status?: $Enums.JobStatus
    createdAt?: Date | string
    updatedAt: Date | string
  }

  export type AssetUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumAssetTypeFieldUpdateOperationsInput | $Enums.AssetType
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    imagePrompt?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumJobStatusFieldUpdateOperationsInput | $Enums.JobStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Project?: ProjectUpdateOneRequiredWithoutAssetNestedInput
  }

  export type AssetUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    type?: EnumAssetTypeFieldUpdateOperationsInput | $Enums.AssetType
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    imagePrompt?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumJobStatusFieldUpdateOperationsInput | $Enums.JobStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AssetCreateManyInput = {
    id: string
    projectId: string
    type: $Enums.AssetType
    name: string
    description: string
    imagePrompt: string
    imageUrl?: string | null
    status?: $Enums.JobStatus
    createdAt?: Date | string
    updatedAt: Date | string
  }

  export type AssetUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumAssetTypeFieldUpdateOperationsInput | $Enums.AssetType
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    imagePrompt?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumJobStatusFieldUpdateOperationsInput | $Enums.JobStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AssetUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    type?: EnumAssetTypeFieldUpdateOperationsInput | $Enums.AssetType
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    imagePrompt?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumJobStatusFieldUpdateOperationsInput | $Enums.JobStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AudioAssetCreateInput = {
    id: string
    type: $Enums.AudioType
    sunoPrompt: string
    sunoJobId?: string | null
    audioUrl?: string | null
    lyrics?: string | null
    mood?: string | null
    genre?: string | null
    status?: $Enums.JobStatus
    createdAt?: Date | string
    updatedAt: Date | string
    Project: ProjectCreateNestedOneWithoutAudioAssetInput
  }

  export type AudioAssetUncheckedCreateInput = {
    id: string
    projectId: string
    type: $Enums.AudioType
    sunoPrompt: string
    sunoJobId?: string | null
    audioUrl?: string | null
    lyrics?: string | null
    mood?: string | null
    genre?: string | null
    status?: $Enums.JobStatus
    createdAt?: Date | string
    updatedAt: Date | string
  }

  export type AudioAssetUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumAudioTypeFieldUpdateOperationsInput | $Enums.AudioType
    sunoPrompt?: StringFieldUpdateOperationsInput | string
    sunoJobId?: NullableStringFieldUpdateOperationsInput | string | null
    audioUrl?: NullableStringFieldUpdateOperationsInput | string | null
    lyrics?: NullableStringFieldUpdateOperationsInput | string | null
    mood?: NullableStringFieldUpdateOperationsInput | string | null
    genre?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumJobStatusFieldUpdateOperationsInput | $Enums.JobStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Project?: ProjectUpdateOneRequiredWithoutAudioAssetNestedInput
  }

  export type AudioAssetUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    type?: EnumAudioTypeFieldUpdateOperationsInput | $Enums.AudioType
    sunoPrompt?: StringFieldUpdateOperationsInput | string
    sunoJobId?: NullableStringFieldUpdateOperationsInput | string | null
    audioUrl?: NullableStringFieldUpdateOperationsInput | string | null
    lyrics?: NullableStringFieldUpdateOperationsInput | string | null
    mood?: NullableStringFieldUpdateOperationsInput | string | null
    genre?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumJobStatusFieldUpdateOperationsInput | $Enums.JobStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AudioAssetCreateManyInput = {
    id: string
    projectId: string
    type: $Enums.AudioType
    sunoPrompt: string
    sunoJobId?: string | null
    audioUrl?: string | null
    lyrics?: string | null
    mood?: string | null
    genre?: string | null
    status?: $Enums.JobStatus
    createdAt?: Date | string
    updatedAt: Date | string
  }

  export type AudioAssetUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumAudioTypeFieldUpdateOperationsInput | $Enums.AudioType
    sunoPrompt?: StringFieldUpdateOperationsInput | string
    sunoJobId?: NullableStringFieldUpdateOperationsInput | string | null
    audioUrl?: NullableStringFieldUpdateOperationsInput | string | null
    lyrics?: NullableStringFieldUpdateOperationsInput | string | null
    mood?: NullableStringFieldUpdateOperationsInput | string | null
    genre?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumJobStatusFieldUpdateOperationsInput | $Enums.JobStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AudioAssetUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    type?: EnumAudioTypeFieldUpdateOperationsInput | $Enums.AudioType
    sunoPrompt?: StringFieldUpdateOperationsInput | string
    sunoJobId?: NullableStringFieldUpdateOperationsInput | string | null
    audioUrl?: NullableStringFieldUpdateOperationsInput | string | null
    lyrics?: NullableStringFieldUpdateOperationsInput | string | null
    mood?: NullableStringFieldUpdateOperationsInput | string | null
    genre?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumJobStatusFieldUpdateOperationsInput | $Enums.JobStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type JobCreateInput = {
    id: string
    type: string
    status?: $Enums.JobStatus
    payload?: NullableJsonNullValueInput | InputJsonValue
    result?: NullableJsonNullValueInput | InputJsonValue
    error?: string | null
    attempts?: number
    createdAt?: Date | string
    updatedAt: Date | string
    Project: ProjectCreateNestedOneWithoutJobInput
  }

  export type JobUncheckedCreateInput = {
    id: string
    projectId: string
    type: string
    status?: $Enums.JobStatus
    payload?: NullableJsonNullValueInput | InputJsonValue
    result?: NullableJsonNullValueInput | InputJsonValue
    error?: string | null
    attempts?: number
    createdAt?: Date | string
    updatedAt: Date | string
  }

  export type JobUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    status?: EnumJobStatusFieldUpdateOperationsInput | $Enums.JobStatus
    payload?: NullableJsonNullValueInput | InputJsonValue
    result?: NullableJsonNullValueInput | InputJsonValue
    error?: NullableStringFieldUpdateOperationsInput | string | null
    attempts?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Project?: ProjectUpdateOneRequiredWithoutJobNestedInput
  }

  export type JobUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    status?: EnumJobStatusFieldUpdateOperationsInput | $Enums.JobStatus
    payload?: NullableJsonNullValueInput | InputJsonValue
    result?: NullableJsonNullValueInput | InputJsonValue
    error?: NullableStringFieldUpdateOperationsInput | string | null
    attempts?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type JobCreateManyInput = {
    id: string
    projectId: string
    type: string
    status?: $Enums.JobStatus
    payload?: NullableJsonNullValueInput | InputJsonValue
    result?: NullableJsonNullValueInput | InputJsonValue
    error?: string | null
    attempts?: number
    createdAt?: Date | string
    updatedAt: Date | string
  }

  export type JobUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    status?: EnumJobStatusFieldUpdateOperationsInput | $Enums.JobStatus
    payload?: NullableJsonNullValueInput | InputJsonValue
    result?: NullableJsonNullValueInput | InputJsonValue
    error?: NullableStringFieldUpdateOperationsInput | string | null
    attempts?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type JobUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    status?: EnumJobStatusFieldUpdateOperationsInput | $Enums.JobStatus
    payload?: NullableJsonNullValueInput | InputJsonValue
    result?: NullableJsonNullValueInput | InputJsonValue
    error?: NullableStringFieldUpdateOperationsInput | string | null
    attempts?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectCreateInput = {
    id?: string
    title: string
    status?: $Enums.ProjectStatus
    ide: string
    gaya: $Enums.StoryStyle
    tokohUtama: string
    asalDaerah: string
    latar: $Enums.HistoricalEra
    latarDetail?: string | null
    plot: string
    screenplay?: NullableJsonNullValueInput | InputJsonValue
    finalVideoUrl?: string | null
    driveFileId?: string | null
    driveShareLink?: string | null
    totalScenes?: number
    completedScenes?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    Asset?: AssetCreateNestedManyWithoutProjectInput
    AudioAsset?: AudioAssetCreateNestedManyWithoutProjectInput
    Job?: JobCreateNestedManyWithoutProjectInput
    Scene?: SceneCreateNestedManyWithoutProjectInput
  }

  export type ProjectUncheckedCreateInput = {
    id?: string
    title: string
    status?: $Enums.ProjectStatus
    ide: string
    gaya: $Enums.StoryStyle
    tokohUtama: string
    asalDaerah: string
    latar: $Enums.HistoricalEra
    latarDetail?: string | null
    plot: string
    screenplay?: NullableJsonNullValueInput | InputJsonValue
    finalVideoUrl?: string | null
    driveFileId?: string | null
    driveShareLink?: string | null
    totalScenes?: number
    completedScenes?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    Asset?: AssetUncheckedCreateNestedManyWithoutProjectInput
    AudioAsset?: AudioAssetUncheckedCreateNestedManyWithoutProjectInput
    Job?: JobUncheckedCreateNestedManyWithoutProjectInput
    Scene?: SceneUncheckedCreateNestedManyWithoutProjectInput
  }

  export type ProjectUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    status?: EnumProjectStatusFieldUpdateOperationsInput | $Enums.ProjectStatus
    ide?: StringFieldUpdateOperationsInput | string
    gaya?: EnumStoryStyleFieldUpdateOperationsInput | $Enums.StoryStyle
    tokohUtama?: StringFieldUpdateOperationsInput | string
    asalDaerah?: StringFieldUpdateOperationsInput | string
    latar?: EnumHistoricalEraFieldUpdateOperationsInput | $Enums.HistoricalEra
    latarDetail?: NullableStringFieldUpdateOperationsInput | string | null
    plot?: StringFieldUpdateOperationsInput | string
    screenplay?: NullableJsonNullValueInput | InputJsonValue
    finalVideoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    driveFileId?: NullableStringFieldUpdateOperationsInput | string | null
    driveShareLink?: NullableStringFieldUpdateOperationsInput | string | null
    totalScenes?: IntFieldUpdateOperationsInput | number
    completedScenes?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Asset?: AssetUpdateManyWithoutProjectNestedInput
    AudioAsset?: AudioAssetUpdateManyWithoutProjectNestedInput
    Job?: JobUpdateManyWithoutProjectNestedInput
    Scene?: SceneUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    status?: EnumProjectStatusFieldUpdateOperationsInput | $Enums.ProjectStatus
    ide?: StringFieldUpdateOperationsInput | string
    gaya?: EnumStoryStyleFieldUpdateOperationsInput | $Enums.StoryStyle
    tokohUtama?: StringFieldUpdateOperationsInput | string
    asalDaerah?: StringFieldUpdateOperationsInput | string
    latar?: EnumHistoricalEraFieldUpdateOperationsInput | $Enums.HistoricalEra
    latarDetail?: NullableStringFieldUpdateOperationsInput | string | null
    plot?: StringFieldUpdateOperationsInput | string
    screenplay?: NullableJsonNullValueInput | InputJsonValue
    finalVideoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    driveFileId?: NullableStringFieldUpdateOperationsInput | string | null
    driveShareLink?: NullableStringFieldUpdateOperationsInput | string | null
    totalScenes?: IntFieldUpdateOperationsInput | number
    completedScenes?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Asset?: AssetUncheckedUpdateManyWithoutProjectNestedInput
    AudioAsset?: AudioAssetUncheckedUpdateManyWithoutProjectNestedInput
    Job?: JobUncheckedUpdateManyWithoutProjectNestedInput
    Scene?: SceneUncheckedUpdateManyWithoutProjectNestedInput
  }

  export type ProjectCreateManyInput = {
    id?: string
    title: string
    status?: $Enums.ProjectStatus
    ide: string
    gaya: $Enums.StoryStyle
    tokohUtama: string
    asalDaerah: string
    latar: $Enums.HistoricalEra
    latarDetail?: string | null
    plot: string
    screenplay?: NullableJsonNullValueInput | InputJsonValue
    finalVideoUrl?: string | null
    driveFileId?: string | null
    driveShareLink?: string | null
    totalScenes?: number
    completedScenes?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProjectUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    status?: EnumProjectStatusFieldUpdateOperationsInput | $Enums.ProjectStatus
    ide?: StringFieldUpdateOperationsInput | string
    gaya?: EnumStoryStyleFieldUpdateOperationsInput | $Enums.StoryStyle
    tokohUtama?: StringFieldUpdateOperationsInput | string
    asalDaerah?: StringFieldUpdateOperationsInput | string
    latar?: EnumHistoricalEraFieldUpdateOperationsInput | $Enums.HistoricalEra
    latarDetail?: NullableStringFieldUpdateOperationsInput | string | null
    plot?: StringFieldUpdateOperationsInput | string
    screenplay?: NullableJsonNullValueInput | InputJsonValue
    finalVideoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    driveFileId?: NullableStringFieldUpdateOperationsInput | string | null
    driveShareLink?: NullableStringFieldUpdateOperationsInput | string | null
    totalScenes?: IntFieldUpdateOperationsInput | number
    completedScenes?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    status?: EnumProjectStatusFieldUpdateOperationsInput | $Enums.ProjectStatus
    ide?: StringFieldUpdateOperationsInput | string
    gaya?: EnumStoryStyleFieldUpdateOperationsInput | $Enums.StoryStyle
    tokohUtama?: StringFieldUpdateOperationsInput | string
    asalDaerah?: StringFieldUpdateOperationsInput | string
    latar?: EnumHistoricalEraFieldUpdateOperationsInput | $Enums.HistoricalEra
    latarDetail?: NullableStringFieldUpdateOperationsInput | string | null
    plot?: StringFieldUpdateOperationsInput | string
    screenplay?: NullableJsonNullValueInput | InputJsonValue
    finalVideoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    driveFileId?: NullableStringFieldUpdateOperationsInput | string | null
    driveShareLink?: NullableStringFieldUpdateOperationsInput | string | null
    totalScenes?: IntFieldUpdateOperationsInput | number
    completedScenes?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SceneCreateInput = {
    id: string
    sceneNumber: number
    title: string
    setting: string
    timeOfDay?: string | null
    action: string
    voiceOver: string
    musicMood?: string | null
    actors?: SceneCreateactorsInput | string[]
    imagePrompt?: string | null
    videoPrompt?: string | null
    cameraAngle?: string | null
    transition?: string | null
    storyboardUrl?: string | null
    clipUrl?: string | null
    durationSeconds?: number
    status?: $Enums.JobStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    Project: ProjectCreateNestedOneWithoutSceneInput
  }

  export type SceneUncheckedCreateInput = {
    id: string
    projectId: string
    sceneNumber: number
    title: string
    setting: string
    timeOfDay?: string | null
    action: string
    voiceOver: string
    musicMood?: string | null
    actors?: SceneCreateactorsInput | string[]
    imagePrompt?: string | null
    videoPrompt?: string | null
    cameraAngle?: string | null
    transition?: string | null
    storyboardUrl?: string | null
    clipUrl?: string | null
    durationSeconds?: number
    status?: $Enums.JobStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SceneUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sceneNumber?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    setting?: StringFieldUpdateOperationsInput | string
    timeOfDay?: NullableStringFieldUpdateOperationsInput | string | null
    action?: StringFieldUpdateOperationsInput | string
    voiceOver?: StringFieldUpdateOperationsInput | string
    musicMood?: NullableStringFieldUpdateOperationsInput | string | null
    actors?: SceneUpdateactorsInput | string[]
    imagePrompt?: NullableStringFieldUpdateOperationsInput | string | null
    videoPrompt?: NullableStringFieldUpdateOperationsInput | string | null
    cameraAngle?: NullableStringFieldUpdateOperationsInput | string | null
    transition?: NullableStringFieldUpdateOperationsInput | string | null
    storyboardUrl?: NullableStringFieldUpdateOperationsInput | string | null
    clipUrl?: NullableStringFieldUpdateOperationsInput | string | null
    durationSeconds?: IntFieldUpdateOperationsInput | number
    status?: EnumJobStatusFieldUpdateOperationsInput | $Enums.JobStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Project?: ProjectUpdateOneRequiredWithoutSceneNestedInput
  }

  export type SceneUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    sceneNumber?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    setting?: StringFieldUpdateOperationsInput | string
    timeOfDay?: NullableStringFieldUpdateOperationsInput | string | null
    action?: StringFieldUpdateOperationsInput | string
    voiceOver?: StringFieldUpdateOperationsInput | string
    musicMood?: NullableStringFieldUpdateOperationsInput | string | null
    actors?: SceneUpdateactorsInput | string[]
    imagePrompt?: NullableStringFieldUpdateOperationsInput | string | null
    videoPrompt?: NullableStringFieldUpdateOperationsInput | string | null
    cameraAngle?: NullableStringFieldUpdateOperationsInput | string | null
    transition?: NullableStringFieldUpdateOperationsInput | string | null
    storyboardUrl?: NullableStringFieldUpdateOperationsInput | string | null
    clipUrl?: NullableStringFieldUpdateOperationsInput | string | null
    durationSeconds?: IntFieldUpdateOperationsInput | number
    status?: EnumJobStatusFieldUpdateOperationsInput | $Enums.JobStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SceneCreateManyInput = {
    id: string
    projectId: string
    sceneNumber: number
    title: string
    setting: string
    timeOfDay?: string | null
    action: string
    voiceOver: string
    musicMood?: string | null
    actors?: SceneCreateactorsInput | string[]
    imagePrompt?: string | null
    videoPrompt?: string | null
    cameraAngle?: string | null
    transition?: string | null
    storyboardUrl?: string | null
    clipUrl?: string | null
    durationSeconds?: number
    status?: $Enums.JobStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SceneUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    sceneNumber?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    setting?: StringFieldUpdateOperationsInput | string
    timeOfDay?: NullableStringFieldUpdateOperationsInput | string | null
    action?: StringFieldUpdateOperationsInput | string
    voiceOver?: StringFieldUpdateOperationsInput | string
    musicMood?: NullableStringFieldUpdateOperationsInput | string | null
    actors?: SceneUpdateactorsInput | string[]
    imagePrompt?: NullableStringFieldUpdateOperationsInput | string | null
    videoPrompt?: NullableStringFieldUpdateOperationsInput | string | null
    cameraAngle?: NullableStringFieldUpdateOperationsInput | string | null
    transition?: NullableStringFieldUpdateOperationsInput | string | null
    storyboardUrl?: NullableStringFieldUpdateOperationsInput | string | null
    clipUrl?: NullableStringFieldUpdateOperationsInput | string | null
    durationSeconds?: IntFieldUpdateOperationsInput | number
    status?: EnumJobStatusFieldUpdateOperationsInput | $Enums.JobStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SceneUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    sceneNumber?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    setting?: StringFieldUpdateOperationsInput | string
    timeOfDay?: NullableStringFieldUpdateOperationsInput | string | null
    action?: StringFieldUpdateOperationsInput | string
    voiceOver?: StringFieldUpdateOperationsInput | string
    musicMood?: NullableStringFieldUpdateOperationsInput | string | null
    actors?: SceneUpdateactorsInput | string[]
    imagePrompt?: NullableStringFieldUpdateOperationsInput | string | null
    videoPrompt?: NullableStringFieldUpdateOperationsInput | string | null
    cameraAngle?: NullableStringFieldUpdateOperationsInput | string | null
    transition?: NullableStringFieldUpdateOperationsInput | string | null
    storyboardUrl?: NullableStringFieldUpdateOperationsInput | string | null
    clipUrl?: NullableStringFieldUpdateOperationsInput | string | null
    durationSeconds?: IntFieldUpdateOperationsInput | number
    status?: EnumJobStatusFieldUpdateOperationsInput | $Enums.JobStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
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

  export type EnumAssetTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.AssetType | EnumAssetTypeFieldRefInput<$PrismaModel>
    in?: $Enums.AssetType[] | ListEnumAssetTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.AssetType[] | ListEnumAssetTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumAssetTypeFilter<$PrismaModel> | $Enums.AssetType
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

  export type EnumJobStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.JobStatus | EnumJobStatusFieldRefInput<$PrismaModel>
    in?: $Enums.JobStatus[] | ListEnumJobStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.JobStatus[] | ListEnumJobStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumJobStatusFilter<$PrismaModel> | $Enums.JobStatus
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

  export type ProjectScalarRelationFilter = {
    is?: ProjectWhereInput
    isNot?: ProjectWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type AssetCountOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    type?: SortOrder
    name?: SortOrder
    description?: SortOrder
    imagePrompt?: SortOrder
    imageUrl?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AssetMaxOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    type?: SortOrder
    name?: SortOrder
    description?: SortOrder
    imagePrompt?: SortOrder
    imageUrl?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AssetMinOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    type?: SortOrder
    name?: SortOrder
    description?: SortOrder
    imagePrompt?: SortOrder
    imageUrl?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
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

  export type EnumAssetTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AssetType | EnumAssetTypeFieldRefInput<$PrismaModel>
    in?: $Enums.AssetType[] | ListEnumAssetTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.AssetType[] | ListEnumAssetTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumAssetTypeWithAggregatesFilter<$PrismaModel> | $Enums.AssetType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAssetTypeFilter<$PrismaModel>
    _max?: NestedEnumAssetTypeFilter<$PrismaModel>
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

  export type EnumJobStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.JobStatus | EnumJobStatusFieldRefInput<$PrismaModel>
    in?: $Enums.JobStatus[] | ListEnumJobStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.JobStatus[] | ListEnumJobStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumJobStatusWithAggregatesFilter<$PrismaModel> | $Enums.JobStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumJobStatusFilter<$PrismaModel>
    _max?: NestedEnumJobStatusFilter<$PrismaModel>
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

  export type EnumAudioTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.AudioType | EnumAudioTypeFieldRefInput<$PrismaModel>
    in?: $Enums.AudioType[] | ListEnumAudioTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.AudioType[] | ListEnumAudioTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumAudioTypeFilter<$PrismaModel> | $Enums.AudioType
  }

  export type AudioAssetCountOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    type?: SortOrder
    sunoPrompt?: SortOrder
    sunoJobId?: SortOrder
    audioUrl?: SortOrder
    lyrics?: SortOrder
    mood?: SortOrder
    genre?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AudioAssetMaxOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    type?: SortOrder
    sunoPrompt?: SortOrder
    sunoJobId?: SortOrder
    audioUrl?: SortOrder
    lyrics?: SortOrder
    mood?: SortOrder
    genre?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AudioAssetMinOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    type?: SortOrder
    sunoPrompt?: SortOrder
    sunoJobId?: SortOrder
    audioUrl?: SortOrder
    lyrics?: SortOrder
    mood?: SortOrder
    genre?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumAudioTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AudioType | EnumAudioTypeFieldRefInput<$PrismaModel>
    in?: $Enums.AudioType[] | ListEnumAudioTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.AudioType[] | ListEnumAudioTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumAudioTypeWithAggregatesFilter<$PrismaModel> | $Enums.AudioType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAudioTypeFilter<$PrismaModel>
    _max?: NestedEnumAudioTypeFilter<$PrismaModel>
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
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

  export type JobCountOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    type?: SortOrder
    status?: SortOrder
    payload?: SortOrder
    result?: SortOrder
    error?: SortOrder
    attempts?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type JobAvgOrderByAggregateInput = {
    attempts?: SortOrder
  }

  export type JobMaxOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    type?: SortOrder
    status?: SortOrder
    error?: SortOrder
    attempts?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type JobMinOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    type?: SortOrder
    status?: SortOrder
    error?: SortOrder
    attempts?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type JobSumOrderByAggregateInput = {
    attempts?: SortOrder
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
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
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
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

  export type EnumProjectStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ProjectStatus | EnumProjectStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ProjectStatus[] | ListEnumProjectStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ProjectStatus[] | ListEnumProjectStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumProjectStatusFilter<$PrismaModel> | $Enums.ProjectStatus
  }

  export type EnumStoryStyleFilter<$PrismaModel = never> = {
    equals?: $Enums.StoryStyle | EnumStoryStyleFieldRefInput<$PrismaModel>
    in?: $Enums.StoryStyle[] | ListEnumStoryStyleFieldRefInput<$PrismaModel>
    notIn?: $Enums.StoryStyle[] | ListEnumStoryStyleFieldRefInput<$PrismaModel>
    not?: NestedEnumStoryStyleFilter<$PrismaModel> | $Enums.StoryStyle
  }

  export type EnumHistoricalEraFilter<$PrismaModel = never> = {
    equals?: $Enums.HistoricalEra | EnumHistoricalEraFieldRefInput<$PrismaModel>
    in?: $Enums.HistoricalEra[] | ListEnumHistoricalEraFieldRefInput<$PrismaModel>
    notIn?: $Enums.HistoricalEra[] | ListEnumHistoricalEraFieldRefInput<$PrismaModel>
    not?: NestedEnumHistoricalEraFilter<$PrismaModel> | $Enums.HistoricalEra
  }

  export type AssetListRelationFilter = {
    every?: AssetWhereInput
    some?: AssetWhereInput
    none?: AssetWhereInput
  }

  export type AudioAssetListRelationFilter = {
    every?: AudioAssetWhereInput
    some?: AudioAssetWhereInput
    none?: AudioAssetWhereInput
  }

  export type JobListRelationFilter = {
    every?: JobWhereInput
    some?: JobWhereInput
    none?: JobWhereInput
  }

  export type SceneListRelationFilter = {
    every?: SceneWhereInput
    some?: SceneWhereInput
    none?: SceneWhereInput
  }

  export type AssetOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AudioAssetOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type JobOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SceneOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProjectCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    status?: SortOrder
    ide?: SortOrder
    gaya?: SortOrder
    tokohUtama?: SortOrder
    asalDaerah?: SortOrder
    latar?: SortOrder
    latarDetail?: SortOrder
    plot?: SortOrder
    screenplay?: SortOrder
    finalVideoUrl?: SortOrder
    driveFileId?: SortOrder
    driveShareLink?: SortOrder
    totalScenes?: SortOrder
    completedScenes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProjectAvgOrderByAggregateInput = {
    totalScenes?: SortOrder
    completedScenes?: SortOrder
  }

  export type ProjectMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    status?: SortOrder
    ide?: SortOrder
    gaya?: SortOrder
    tokohUtama?: SortOrder
    asalDaerah?: SortOrder
    latar?: SortOrder
    latarDetail?: SortOrder
    plot?: SortOrder
    finalVideoUrl?: SortOrder
    driveFileId?: SortOrder
    driveShareLink?: SortOrder
    totalScenes?: SortOrder
    completedScenes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProjectMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    status?: SortOrder
    ide?: SortOrder
    gaya?: SortOrder
    tokohUtama?: SortOrder
    asalDaerah?: SortOrder
    latar?: SortOrder
    latarDetail?: SortOrder
    plot?: SortOrder
    finalVideoUrl?: SortOrder
    driveFileId?: SortOrder
    driveShareLink?: SortOrder
    totalScenes?: SortOrder
    completedScenes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProjectSumOrderByAggregateInput = {
    totalScenes?: SortOrder
    completedScenes?: SortOrder
  }

  export type EnumProjectStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ProjectStatus | EnumProjectStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ProjectStatus[] | ListEnumProjectStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ProjectStatus[] | ListEnumProjectStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumProjectStatusWithAggregatesFilter<$PrismaModel> | $Enums.ProjectStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumProjectStatusFilter<$PrismaModel>
    _max?: NestedEnumProjectStatusFilter<$PrismaModel>
  }

  export type EnumStoryStyleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.StoryStyle | EnumStoryStyleFieldRefInput<$PrismaModel>
    in?: $Enums.StoryStyle[] | ListEnumStoryStyleFieldRefInput<$PrismaModel>
    notIn?: $Enums.StoryStyle[] | ListEnumStoryStyleFieldRefInput<$PrismaModel>
    not?: NestedEnumStoryStyleWithAggregatesFilter<$PrismaModel> | $Enums.StoryStyle
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStoryStyleFilter<$PrismaModel>
    _max?: NestedEnumStoryStyleFilter<$PrismaModel>
  }

  export type EnumHistoricalEraWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.HistoricalEra | EnumHistoricalEraFieldRefInput<$PrismaModel>
    in?: $Enums.HistoricalEra[] | ListEnumHistoricalEraFieldRefInput<$PrismaModel>
    notIn?: $Enums.HistoricalEra[] | ListEnumHistoricalEraFieldRefInput<$PrismaModel>
    not?: NestedEnumHistoricalEraWithAggregatesFilter<$PrismaModel> | $Enums.HistoricalEra
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumHistoricalEraFilter<$PrismaModel>
    _max?: NestedEnumHistoricalEraFilter<$PrismaModel>
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type SceneProjectIdSceneNumberCompoundUniqueInput = {
    projectId: string
    sceneNumber: number
  }

  export type SceneCountOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    sceneNumber?: SortOrder
    title?: SortOrder
    setting?: SortOrder
    timeOfDay?: SortOrder
    action?: SortOrder
    voiceOver?: SortOrder
    musicMood?: SortOrder
    actors?: SortOrder
    imagePrompt?: SortOrder
    videoPrompt?: SortOrder
    cameraAngle?: SortOrder
    transition?: SortOrder
    storyboardUrl?: SortOrder
    clipUrl?: SortOrder
    durationSeconds?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SceneAvgOrderByAggregateInput = {
    sceneNumber?: SortOrder
    durationSeconds?: SortOrder
  }

  export type SceneMaxOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    sceneNumber?: SortOrder
    title?: SortOrder
    setting?: SortOrder
    timeOfDay?: SortOrder
    action?: SortOrder
    voiceOver?: SortOrder
    musicMood?: SortOrder
    imagePrompt?: SortOrder
    videoPrompt?: SortOrder
    cameraAngle?: SortOrder
    transition?: SortOrder
    storyboardUrl?: SortOrder
    clipUrl?: SortOrder
    durationSeconds?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SceneMinOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    sceneNumber?: SortOrder
    title?: SortOrder
    setting?: SortOrder
    timeOfDay?: SortOrder
    action?: SortOrder
    voiceOver?: SortOrder
    musicMood?: SortOrder
    imagePrompt?: SortOrder
    videoPrompt?: SortOrder
    cameraAngle?: SortOrder
    transition?: SortOrder
    storyboardUrl?: SortOrder
    clipUrl?: SortOrder
    durationSeconds?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SceneSumOrderByAggregateInput = {
    sceneNumber?: SortOrder
    durationSeconds?: SortOrder
  }

  export type ProjectCreateNestedOneWithoutAssetInput = {
    create?: XOR<ProjectCreateWithoutAssetInput, ProjectUncheckedCreateWithoutAssetInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutAssetInput
    connect?: ProjectWhereUniqueInput
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumAssetTypeFieldUpdateOperationsInput = {
    set?: $Enums.AssetType
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type EnumJobStatusFieldUpdateOperationsInput = {
    set?: $Enums.JobStatus
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type ProjectUpdateOneRequiredWithoutAssetNestedInput = {
    create?: XOR<ProjectCreateWithoutAssetInput, ProjectUncheckedCreateWithoutAssetInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutAssetInput
    upsert?: ProjectUpsertWithoutAssetInput
    connect?: ProjectWhereUniqueInput
    update?: XOR<XOR<ProjectUpdateToOneWithWhereWithoutAssetInput, ProjectUpdateWithoutAssetInput>, ProjectUncheckedUpdateWithoutAssetInput>
  }

  export type ProjectCreateNestedOneWithoutAudioAssetInput = {
    create?: XOR<ProjectCreateWithoutAudioAssetInput, ProjectUncheckedCreateWithoutAudioAssetInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutAudioAssetInput
    connect?: ProjectWhereUniqueInput
  }

  export type EnumAudioTypeFieldUpdateOperationsInput = {
    set?: $Enums.AudioType
  }

  export type ProjectUpdateOneRequiredWithoutAudioAssetNestedInput = {
    create?: XOR<ProjectCreateWithoutAudioAssetInput, ProjectUncheckedCreateWithoutAudioAssetInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutAudioAssetInput
    upsert?: ProjectUpsertWithoutAudioAssetInput
    connect?: ProjectWhereUniqueInput
    update?: XOR<XOR<ProjectUpdateToOneWithWhereWithoutAudioAssetInput, ProjectUpdateWithoutAudioAssetInput>, ProjectUncheckedUpdateWithoutAudioAssetInput>
  }

  export type ProjectCreateNestedOneWithoutJobInput = {
    create?: XOR<ProjectCreateWithoutJobInput, ProjectUncheckedCreateWithoutJobInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutJobInput
    connect?: ProjectWhereUniqueInput
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ProjectUpdateOneRequiredWithoutJobNestedInput = {
    create?: XOR<ProjectCreateWithoutJobInput, ProjectUncheckedCreateWithoutJobInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutJobInput
    upsert?: ProjectUpsertWithoutJobInput
    connect?: ProjectWhereUniqueInput
    update?: XOR<XOR<ProjectUpdateToOneWithWhereWithoutJobInput, ProjectUpdateWithoutJobInput>, ProjectUncheckedUpdateWithoutJobInput>
  }

  export type AssetCreateNestedManyWithoutProjectInput = {
    create?: XOR<AssetCreateWithoutProjectInput, AssetUncheckedCreateWithoutProjectInput> | AssetCreateWithoutProjectInput[] | AssetUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: AssetCreateOrConnectWithoutProjectInput | AssetCreateOrConnectWithoutProjectInput[]
    createMany?: AssetCreateManyProjectInputEnvelope
    connect?: AssetWhereUniqueInput | AssetWhereUniqueInput[]
  }

  export type AudioAssetCreateNestedManyWithoutProjectInput = {
    create?: XOR<AudioAssetCreateWithoutProjectInput, AudioAssetUncheckedCreateWithoutProjectInput> | AudioAssetCreateWithoutProjectInput[] | AudioAssetUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: AudioAssetCreateOrConnectWithoutProjectInput | AudioAssetCreateOrConnectWithoutProjectInput[]
    createMany?: AudioAssetCreateManyProjectInputEnvelope
    connect?: AudioAssetWhereUniqueInput | AudioAssetWhereUniqueInput[]
  }

  export type JobCreateNestedManyWithoutProjectInput = {
    create?: XOR<JobCreateWithoutProjectInput, JobUncheckedCreateWithoutProjectInput> | JobCreateWithoutProjectInput[] | JobUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: JobCreateOrConnectWithoutProjectInput | JobCreateOrConnectWithoutProjectInput[]
    createMany?: JobCreateManyProjectInputEnvelope
    connect?: JobWhereUniqueInput | JobWhereUniqueInput[]
  }

  export type SceneCreateNestedManyWithoutProjectInput = {
    create?: XOR<SceneCreateWithoutProjectInput, SceneUncheckedCreateWithoutProjectInput> | SceneCreateWithoutProjectInput[] | SceneUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: SceneCreateOrConnectWithoutProjectInput | SceneCreateOrConnectWithoutProjectInput[]
    createMany?: SceneCreateManyProjectInputEnvelope
    connect?: SceneWhereUniqueInput | SceneWhereUniqueInput[]
  }

  export type AssetUncheckedCreateNestedManyWithoutProjectInput = {
    create?: XOR<AssetCreateWithoutProjectInput, AssetUncheckedCreateWithoutProjectInput> | AssetCreateWithoutProjectInput[] | AssetUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: AssetCreateOrConnectWithoutProjectInput | AssetCreateOrConnectWithoutProjectInput[]
    createMany?: AssetCreateManyProjectInputEnvelope
    connect?: AssetWhereUniqueInput | AssetWhereUniqueInput[]
  }

  export type AudioAssetUncheckedCreateNestedManyWithoutProjectInput = {
    create?: XOR<AudioAssetCreateWithoutProjectInput, AudioAssetUncheckedCreateWithoutProjectInput> | AudioAssetCreateWithoutProjectInput[] | AudioAssetUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: AudioAssetCreateOrConnectWithoutProjectInput | AudioAssetCreateOrConnectWithoutProjectInput[]
    createMany?: AudioAssetCreateManyProjectInputEnvelope
    connect?: AudioAssetWhereUniqueInput | AudioAssetWhereUniqueInput[]
  }

  export type JobUncheckedCreateNestedManyWithoutProjectInput = {
    create?: XOR<JobCreateWithoutProjectInput, JobUncheckedCreateWithoutProjectInput> | JobCreateWithoutProjectInput[] | JobUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: JobCreateOrConnectWithoutProjectInput | JobCreateOrConnectWithoutProjectInput[]
    createMany?: JobCreateManyProjectInputEnvelope
    connect?: JobWhereUniqueInput | JobWhereUniqueInput[]
  }

  export type SceneUncheckedCreateNestedManyWithoutProjectInput = {
    create?: XOR<SceneCreateWithoutProjectInput, SceneUncheckedCreateWithoutProjectInput> | SceneCreateWithoutProjectInput[] | SceneUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: SceneCreateOrConnectWithoutProjectInput | SceneCreateOrConnectWithoutProjectInput[]
    createMany?: SceneCreateManyProjectInputEnvelope
    connect?: SceneWhereUniqueInput | SceneWhereUniqueInput[]
  }

  export type EnumProjectStatusFieldUpdateOperationsInput = {
    set?: $Enums.ProjectStatus
  }

  export type EnumStoryStyleFieldUpdateOperationsInput = {
    set?: $Enums.StoryStyle
  }

  export type EnumHistoricalEraFieldUpdateOperationsInput = {
    set?: $Enums.HistoricalEra
  }

  export type AssetUpdateManyWithoutProjectNestedInput = {
    create?: XOR<AssetCreateWithoutProjectInput, AssetUncheckedCreateWithoutProjectInput> | AssetCreateWithoutProjectInput[] | AssetUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: AssetCreateOrConnectWithoutProjectInput | AssetCreateOrConnectWithoutProjectInput[]
    upsert?: AssetUpsertWithWhereUniqueWithoutProjectInput | AssetUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: AssetCreateManyProjectInputEnvelope
    set?: AssetWhereUniqueInput | AssetWhereUniqueInput[]
    disconnect?: AssetWhereUniqueInput | AssetWhereUniqueInput[]
    delete?: AssetWhereUniqueInput | AssetWhereUniqueInput[]
    connect?: AssetWhereUniqueInput | AssetWhereUniqueInput[]
    update?: AssetUpdateWithWhereUniqueWithoutProjectInput | AssetUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: AssetUpdateManyWithWhereWithoutProjectInput | AssetUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: AssetScalarWhereInput | AssetScalarWhereInput[]
  }

  export type AudioAssetUpdateManyWithoutProjectNestedInput = {
    create?: XOR<AudioAssetCreateWithoutProjectInput, AudioAssetUncheckedCreateWithoutProjectInput> | AudioAssetCreateWithoutProjectInput[] | AudioAssetUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: AudioAssetCreateOrConnectWithoutProjectInput | AudioAssetCreateOrConnectWithoutProjectInput[]
    upsert?: AudioAssetUpsertWithWhereUniqueWithoutProjectInput | AudioAssetUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: AudioAssetCreateManyProjectInputEnvelope
    set?: AudioAssetWhereUniqueInput | AudioAssetWhereUniqueInput[]
    disconnect?: AudioAssetWhereUniqueInput | AudioAssetWhereUniqueInput[]
    delete?: AudioAssetWhereUniqueInput | AudioAssetWhereUniqueInput[]
    connect?: AudioAssetWhereUniqueInput | AudioAssetWhereUniqueInput[]
    update?: AudioAssetUpdateWithWhereUniqueWithoutProjectInput | AudioAssetUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: AudioAssetUpdateManyWithWhereWithoutProjectInput | AudioAssetUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: AudioAssetScalarWhereInput | AudioAssetScalarWhereInput[]
  }

  export type JobUpdateManyWithoutProjectNestedInput = {
    create?: XOR<JobCreateWithoutProjectInput, JobUncheckedCreateWithoutProjectInput> | JobCreateWithoutProjectInput[] | JobUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: JobCreateOrConnectWithoutProjectInput | JobCreateOrConnectWithoutProjectInput[]
    upsert?: JobUpsertWithWhereUniqueWithoutProjectInput | JobUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: JobCreateManyProjectInputEnvelope
    set?: JobWhereUniqueInput | JobWhereUniqueInput[]
    disconnect?: JobWhereUniqueInput | JobWhereUniqueInput[]
    delete?: JobWhereUniqueInput | JobWhereUniqueInput[]
    connect?: JobWhereUniqueInput | JobWhereUniqueInput[]
    update?: JobUpdateWithWhereUniqueWithoutProjectInput | JobUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: JobUpdateManyWithWhereWithoutProjectInput | JobUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: JobScalarWhereInput | JobScalarWhereInput[]
  }

  export type SceneUpdateManyWithoutProjectNestedInput = {
    create?: XOR<SceneCreateWithoutProjectInput, SceneUncheckedCreateWithoutProjectInput> | SceneCreateWithoutProjectInput[] | SceneUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: SceneCreateOrConnectWithoutProjectInput | SceneCreateOrConnectWithoutProjectInput[]
    upsert?: SceneUpsertWithWhereUniqueWithoutProjectInput | SceneUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: SceneCreateManyProjectInputEnvelope
    set?: SceneWhereUniqueInput | SceneWhereUniqueInput[]
    disconnect?: SceneWhereUniqueInput | SceneWhereUniqueInput[]
    delete?: SceneWhereUniqueInput | SceneWhereUniqueInput[]
    connect?: SceneWhereUniqueInput | SceneWhereUniqueInput[]
    update?: SceneUpdateWithWhereUniqueWithoutProjectInput | SceneUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: SceneUpdateManyWithWhereWithoutProjectInput | SceneUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: SceneScalarWhereInput | SceneScalarWhereInput[]
  }

  export type AssetUncheckedUpdateManyWithoutProjectNestedInput = {
    create?: XOR<AssetCreateWithoutProjectInput, AssetUncheckedCreateWithoutProjectInput> | AssetCreateWithoutProjectInput[] | AssetUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: AssetCreateOrConnectWithoutProjectInput | AssetCreateOrConnectWithoutProjectInput[]
    upsert?: AssetUpsertWithWhereUniqueWithoutProjectInput | AssetUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: AssetCreateManyProjectInputEnvelope
    set?: AssetWhereUniqueInput | AssetWhereUniqueInput[]
    disconnect?: AssetWhereUniqueInput | AssetWhereUniqueInput[]
    delete?: AssetWhereUniqueInput | AssetWhereUniqueInput[]
    connect?: AssetWhereUniqueInput | AssetWhereUniqueInput[]
    update?: AssetUpdateWithWhereUniqueWithoutProjectInput | AssetUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: AssetUpdateManyWithWhereWithoutProjectInput | AssetUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: AssetScalarWhereInput | AssetScalarWhereInput[]
  }

  export type AudioAssetUncheckedUpdateManyWithoutProjectNestedInput = {
    create?: XOR<AudioAssetCreateWithoutProjectInput, AudioAssetUncheckedCreateWithoutProjectInput> | AudioAssetCreateWithoutProjectInput[] | AudioAssetUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: AudioAssetCreateOrConnectWithoutProjectInput | AudioAssetCreateOrConnectWithoutProjectInput[]
    upsert?: AudioAssetUpsertWithWhereUniqueWithoutProjectInput | AudioAssetUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: AudioAssetCreateManyProjectInputEnvelope
    set?: AudioAssetWhereUniqueInput | AudioAssetWhereUniqueInput[]
    disconnect?: AudioAssetWhereUniqueInput | AudioAssetWhereUniqueInput[]
    delete?: AudioAssetWhereUniqueInput | AudioAssetWhereUniqueInput[]
    connect?: AudioAssetWhereUniqueInput | AudioAssetWhereUniqueInput[]
    update?: AudioAssetUpdateWithWhereUniqueWithoutProjectInput | AudioAssetUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: AudioAssetUpdateManyWithWhereWithoutProjectInput | AudioAssetUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: AudioAssetScalarWhereInput | AudioAssetScalarWhereInput[]
  }

  export type JobUncheckedUpdateManyWithoutProjectNestedInput = {
    create?: XOR<JobCreateWithoutProjectInput, JobUncheckedCreateWithoutProjectInput> | JobCreateWithoutProjectInput[] | JobUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: JobCreateOrConnectWithoutProjectInput | JobCreateOrConnectWithoutProjectInput[]
    upsert?: JobUpsertWithWhereUniqueWithoutProjectInput | JobUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: JobCreateManyProjectInputEnvelope
    set?: JobWhereUniqueInput | JobWhereUniqueInput[]
    disconnect?: JobWhereUniqueInput | JobWhereUniqueInput[]
    delete?: JobWhereUniqueInput | JobWhereUniqueInput[]
    connect?: JobWhereUniqueInput | JobWhereUniqueInput[]
    update?: JobUpdateWithWhereUniqueWithoutProjectInput | JobUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: JobUpdateManyWithWhereWithoutProjectInput | JobUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: JobScalarWhereInput | JobScalarWhereInput[]
  }

  export type SceneUncheckedUpdateManyWithoutProjectNestedInput = {
    create?: XOR<SceneCreateWithoutProjectInput, SceneUncheckedCreateWithoutProjectInput> | SceneCreateWithoutProjectInput[] | SceneUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: SceneCreateOrConnectWithoutProjectInput | SceneCreateOrConnectWithoutProjectInput[]
    upsert?: SceneUpsertWithWhereUniqueWithoutProjectInput | SceneUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: SceneCreateManyProjectInputEnvelope
    set?: SceneWhereUniqueInput | SceneWhereUniqueInput[]
    disconnect?: SceneWhereUniqueInput | SceneWhereUniqueInput[]
    delete?: SceneWhereUniqueInput | SceneWhereUniqueInput[]
    connect?: SceneWhereUniqueInput | SceneWhereUniqueInput[]
    update?: SceneUpdateWithWhereUniqueWithoutProjectInput | SceneUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: SceneUpdateManyWithWhereWithoutProjectInput | SceneUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: SceneScalarWhereInput | SceneScalarWhereInput[]
  }

  export type SceneCreateactorsInput = {
    set: string[]
  }

  export type ProjectCreateNestedOneWithoutSceneInput = {
    create?: XOR<ProjectCreateWithoutSceneInput, ProjectUncheckedCreateWithoutSceneInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutSceneInput
    connect?: ProjectWhereUniqueInput
  }

  export type SceneUpdateactorsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type ProjectUpdateOneRequiredWithoutSceneNestedInput = {
    create?: XOR<ProjectCreateWithoutSceneInput, ProjectUncheckedCreateWithoutSceneInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutSceneInput
    upsert?: ProjectUpsertWithoutSceneInput
    connect?: ProjectWhereUniqueInput
    update?: XOR<XOR<ProjectUpdateToOneWithWhereWithoutSceneInput, ProjectUpdateWithoutSceneInput>, ProjectUncheckedUpdateWithoutSceneInput>
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

  export type NestedEnumAssetTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.AssetType | EnumAssetTypeFieldRefInput<$PrismaModel>
    in?: $Enums.AssetType[] | ListEnumAssetTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.AssetType[] | ListEnumAssetTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumAssetTypeFilter<$PrismaModel> | $Enums.AssetType
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

  export type NestedEnumJobStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.JobStatus | EnumJobStatusFieldRefInput<$PrismaModel>
    in?: $Enums.JobStatus[] | ListEnumJobStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.JobStatus[] | ListEnumJobStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumJobStatusFilter<$PrismaModel> | $Enums.JobStatus
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

  export type NestedEnumAssetTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AssetType | EnumAssetTypeFieldRefInput<$PrismaModel>
    in?: $Enums.AssetType[] | ListEnumAssetTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.AssetType[] | ListEnumAssetTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumAssetTypeWithAggregatesFilter<$PrismaModel> | $Enums.AssetType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAssetTypeFilter<$PrismaModel>
    _max?: NestedEnumAssetTypeFilter<$PrismaModel>
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

  export type NestedEnumJobStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.JobStatus | EnumJobStatusFieldRefInput<$PrismaModel>
    in?: $Enums.JobStatus[] | ListEnumJobStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.JobStatus[] | ListEnumJobStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumJobStatusWithAggregatesFilter<$PrismaModel> | $Enums.JobStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumJobStatusFilter<$PrismaModel>
    _max?: NestedEnumJobStatusFilter<$PrismaModel>
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

  export type NestedEnumAudioTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.AudioType | EnumAudioTypeFieldRefInput<$PrismaModel>
    in?: $Enums.AudioType[] | ListEnumAudioTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.AudioType[] | ListEnumAudioTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumAudioTypeFilter<$PrismaModel> | $Enums.AudioType
  }

  export type NestedEnumAudioTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AudioType | EnumAudioTypeFieldRefInput<$PrismaModel>
    in?: $Enums.AudioType[] | ListEnumAudioTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.AudioType[] | ListEnumAudioTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumAudioTypeWithAggregatesFilter<$PrismaModel> | $Enums.AudioType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAudioTypeFilter<$PrismaModel>
    _max?: NestedEnumAudioTypeFilter<$PrismaModel>
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
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

  export type NestedEnumProjectStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ProjectStatus | EnumProjectStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ProjectStatus[] | ListEnumProjectStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ProjectStatus[] | ListEnumProjectStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumProjectStatusFilter<$PrismaModel> | $Enums.ProjectStatus
  }

  export type NestedEnumStoryStyleFilter<$PrismaModel = never> = {
    equals?: $Enums.StoryStyle | EnumStoryStyleFieldRefInput<$PrismaModel>
    in?: $Enums.StoryStyle[] | ListEnumStoryStyleFieldRefInput<$PrismaModel>
    notIn?: $Enums.StoryStyle[] | ListEnumStoryStyleFieldRefInput<$PrismaModel>
    not?: NestedEnumStoryStyleFilter<$PrismaModel> | $Enums.StoryStyle
  }

  export type NestedEnumHistoricalEraFilter<$PrismaModel = never> = {
    equals?: $Enums.HistoricalEra | EnumHistoricalEraFieldRefInput<$PrismaModel>
    in?: $Enums.HistoricalEra[] | ListEnumHistoricalEraFieldRefInput<$PrismaModel>
    notIn?: $Enums.HistoricalEra[] | ListEnumHistoricalEraFieldRefInput<$PrismaModel>
    not?: NestedEnumHistoricalEraFilter<$PrismaModel> | $Enums.HistoricalEra
  }

  export type NestedEnumProjectStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ProjectStatus | EnumProjectStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ProjectStatus[] | ListEnumProjectStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ProjectStatus[] | ListEnumProjectStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumProjectStatusWithAggregatesFilter<$PrismaModel> | $Enums.ProjectStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumProjectStatusFilter<$PrismaModel>
    _max?: NestedEnumProjectStatusFilter<$PrismaModel>
  }

  export type NestedEnumStoryStyleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.StoryStyle | EnumStoryStyleFieldRefInput<$PrismaModel>
    in?: $Enums.StoryStyle[] | ListEnumStoryStyleFieldRefInput<$PrismaModel>
    notIn?: $Enums.StoryStyle[] | ListEnumStoryStyleFieldRefInput<$PrismaModel>
    not?: NestedEnumStoryStyleWithAggregatesFilter<$PrismaModel> | $Enums.StoryStyle
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStoryStyleFilter<$PrismaModel>
    _max?: NestedEnumStoryStyleFilter<$PrismaModel>
  }

  export type NestedEnumHistoricalEraWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.HistoricalEra | EnumHistoricalEraFieldRefInput<$PrismaModel>
    in?: $Enums.HistoricalEra[] | ListEnumHistoricalEraFieldRefInput<$PrismaModel>
    notIn?: $Enums.HistoricalEra[] | ListEnumHistoricalEraFieldRefInput<$PrismaModel>
    not?: NestedEnumHistoricalEraWithAggregatesFilter<$PrismaModel> | $Enums.HistoricalEra
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumHistoricalEraFilter<$PrismaModel>
    _max?: NestedEnumHistoricalEraFilter<$PrismaModel>
  }

  export type ProjectCreateWithoutAssetInput = {
    id?: string
    title: string
    status?: $Enums.ProjectStatus
    ide: string
    gaya: $Enums.StoryStyle
    tokohUtama: string
    asalDaerah: string
    latar: $Enums.HistoricalEra
    latarDetail?: string | null
    plot: string
    screenplay?: NullableJsonNullValueInput | InputJsonValue
    finalVideoUrl?: string | null
    driveFileId?: string | null
    driveShareLink?: string | null
    totalScenes?: number
    completedScenes?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    AudioAsset?: AudioAssetCreateNestedManyWithoutProjectInput
    Job?: JobCreateNestedManyWithoutProjectInput
    Scene?: SceneCreateNestedManyWithoutProjectInput
  }

  export type ProjectUncheckedCreateWithoutAssetInput = {
    id?: string
    title: string
    status?: $Enums.ProjectStatus
    ide: string
    gaya: $Enums.StoryStyle
    tokohUtama: string
    asalDaerah: string
    latar: $Enums.HistoricalEra
    latarDetail?: string | null
    plot: string
    screenplay?: NullableJsonNullValueInput | InputJsonValue
    finalVideoUrl?: string | null
    driveFileId?: string | null
    driveShareLink?: string | null
    totalScenes?: number
    completedScenes?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    AudioAsset?: AudioAssetUncheckedCreateNestedManyWithoutProjectInput
    Job?: JobUncheckedCreateNestedManyWithoutProjectInput
    Scene?: SceneUncheckedCreateNestedManyWithoutProjectInput
  }

  export type ProjectCreateOrConnectWithoutAssetInput = {
    where: ProjectWhereUniqueInput
    create: XOR<ProjectCreateWithoutAssetInput, ProjectUncheckedCreateWithoutAssetInput>
  }

  export type ProjectUpsertWithoutAssetInput = {
    update: XOR<ProjectUpdateWithoutAssetInput, ProjectUncheckedUpdateWithoutAssetInput>
    create: XOR<ProjectCreateWithoutAssetInput, ProjectUncheckedCreateWithoutAssetInput>
    where?: ProjectWhereInput
  }

  export type ProjectUpdateToOneWithWhereWithoutAssetInput = {
    where?: ProjectWhereInput
    data: XOR<ProjectUpdateWithoutAssetInput, ProjectUncheckedUpdateWithoutAssetInput>
  }

  export type ProjectUpdateWithoutAssetInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    status?: EnumProjectStatusFieldUpdateOperationsInput | $Enums.ProjectStatus
    ide?: StringFieldUpdateOperationsInput | string
    gaya?: EnumStoryStyleFieldUpdateOperationsInput | $Enums.StoryStyle
    tokohUtama?: StringFieldUpdateOperationsInput | string
    asalDaerah?: StringFieldUpdateOperationsInput | string
    latar?: EnumHistoricalEraFieldUpdateOperationsInput | $Enums.HistoricalEra
    latarDetail?: NullableStringFieldUpdateOperationsInput | string | null
    plot?: StringFieldUpdateOperationsInput | string
    screenplay?: NullableJsonNullValueInput | InputJsonValue
    finalVideoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    driveFileId?: NullableStringFieldUpdateOperationsInput | string | null
    driveShareLink?: NullableStringFieldUpdateOperationsInput | string | null
    totalScenes?: IntFieldUpdateOperationsInput | number
    completedScenes?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    AudioAsset?: AudioAssetUpdateManyWithoutProjectNestedInput
    Job?: JobUpdateManyWithoutProjectNestedInput
    Scene?: SceneUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateWithoutAssetInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    status?: EnumProjectStatusFieldUpdateOperationsInput | $Enums.ProjectStatus
    ide?: StringFieldUpdateOperationsInput | string
    gaya?: EnumStoryStyleFieldUpdateOperationsInput | $Enums.StoryStyle
    tokohUtama?: StringFieldUpdateOperationsInput | string
    asalDaerah?: StringFieldUpdateOperationsInput | string
    latar?: EnumHistoricalEraFieldUpdateOperationsInput | $Enums.HistoricalEra
    latarDetail?: NullableStringFieldUpdateOperationsInput | string | null
    plot?: StringFieldUpdateOperationsInput | string
    screenplay?: NullableJsonNullValueInput | InputJsonValue
    finalVideoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    driveFileId?: NullableStringFieldUpdateOperationsInput | string | null
    driveShareLink?: NullableStringFieldUpdateOperationsInput | string | null
    totalScenes?: IntFieldUpdateOperationsInput | number
    completedScenes?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    AudioAsset?: AudioAssetUncheckedUpdateManyWithoutProjectNestedInput
    Job?: JobUncheckedUpdateManyWithoutProjectNestedInput
    Scene?: SceneUncheckedUpdateManyWithoutProjectNestedInput
  }

  export type ProjectCreateWithoutAudioAssetInput = {
    id?: string
    title: string
    status?: $Enums.ProjectStatus
    ide: string
    gaya: $Enums.StoryStyle
    tokohUtama: string
    asalDaerah: string
    latar: $Enums.HistoricalEra
    latarDetail?: string | null
    plot: string
    screenplay?: NullableJsonNullValueInput | InputJsonValue
    finalVideoUrl?: string | null
    driveFileId?: string | null
    driveShareLink?: string | null
    totalScenes?: number
    completedScenes?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    Asset?: AssetCreateNestedManyWithoutProjectInput
    Job?: JobCreateNestedManyWithoutProjectInput
    Scene?: SceneCreateNestedManyWithoutProjectInput
  }

  export type ProjectUncheckedCreateWithoutAudioAssetInput = {
    id?: string
    title: string
    status?: $Enums.ProjectStatus
    ide: string
    gaya: $Enums.StoryStyle
    tokohUtama: string
    asalDaerah: string
    latar: $Enums.HistoricalEra
    latarDetail?: string | null
    plot: string
    screenplay?: NullableJsonNullValueInput | InputJsonValue
    finalVideoUrl?: string | null
    driveFileId?: string | null
    driveShareLink?: string | null
    totalScenes?: number
    completedScenes?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    Asset?: AssetUncheckedCreateNestedManyWithoutProjectInput
    Job?: JobUncheckedCreateNestedManyWithoutProjectInput
    Scene?: SceneUncheckedCreateNestedManyWithoutProjectInput
  }

  export type ProjectCreateOrConnectWithoutAudioAssetInput = {
    where: ProjectWhereUniqueInput
    create: XOR<ProjectCreateWithoutAudioAssetInput, ProjectUncheckedCreateWithoutAudioAssetInput>
  }

  export type ProjectUpsertWithoutAudioAssetInput = {
    update: XOR<ProjectUpdateWithoutAudioAssetInput, ProjectUncheckedUpdateWithoutAudioAssetInput>
    create: XOR<ProjectCreateWithoutAudioAssetInput, ProjectUncheckedCreateWithoutAudioAssetInput>
    where?: ProjectWhereInput
  }

  export type ProjectUpdateToOneWithWhereWithoutAudioAssetInput = {
    where?: ProjectWhereInput
    data: XOR<ProjectUpdateWithoutAudioAssetInput, ProjectUncheckedUpdateWithoutAudioAssetInput>
  }

  export type ProjectUpdateWithoutAudioAssetInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    status?: EnumProjectStatusFieldUpdateOperationsInput | $Enums.ProjectStatus
    ide?: StringFieldUpdateOperationsInput | string
    gaya?: EnumStoryStyleFieldUpdateOperationsInput | $Enums.StoryStyle
    tokohUtama?: StringFieldUpdateOperationsInput | string
    asalDaerah?: StringFieldUpdateOperationsInput | string
    latar?: EnumHistoricalEraFieldUpdateOperationsInput | $Enums.HistoricalEra
    latarDetail?: NullableStringFieldUpdateOperationsInput | string | null
    plot?: StringFieldUpdateOperationsInput | string
    screenplay?: NullableJsonNullValueInput | InputJsonValue
    finalVideoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    driveFileId?: NullableStringFieldUpdateOperationsInput | string | null
    driveShareLink?: NullableStringFieldUpdateOperationsInput | string | null
    totalScenes?: IntFieldUpdateOperationsInput | number
    completedScenes?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Asset?: AssetUpdateManyWithoutProjectNestedInput
    Job?: JobUpdateManyWithoutProjectNestedInput
    Scene?: SceneUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateWithoutAudioAssetInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    status?: EnumProjectStatusFieldUpdateOperationsInput | $Enums.ProjectStatus
    ide?: StringFieldUpdateOperationsInput | string
    gaya?: EnumStoryStyleFieldUpdateOperationsInput | $Enums.StoryStyle
    tokohUtama?: StringFieldUpdateOperationsInput | string
    asalDaerah?: StringFieldUpdateOperationsInput | string
    latar?: EnumHistoricalEraFieldUpdateOperationsInput | $Enums.HistoricalEra
    latarDetail?: NullableStringFieldUpdateOperationsInput | string | null
    plot?: StringFieldUpdateOperationsInput | string
    screenplay?: NullableJsonNullValueInput | InputJsonValue
    finalVideoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    driveFileId?: NullableStringFieldUpdateOperationsInput | string | null
    driveShareLink?: NullableStringFieldUpdateOperationsInput | string | null
    totalScenes?: IntFieldUpdateOperationsInput | number
    completedScenes?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Asset?: AssetUncheckedUpdateManyWithoutProjectNestedInput
    Job?: JobUncheckedUpdateManyWithoutProjectNestedInput
    Scene?: SceneUncheckedUpdateManyWithoutProjectNestedInput
  }

  export type ProjectCreateWithoutJobInput = {
    id?: string
    title: string
    status?: $Enums.ProjectStatus
    ide: string
    gaya: $Enums.StoryStyle
    tokohUtama: string
    asalDaerah: string
    latar: $Enums.HistoricalEra
    latarDetail?: string | null
    plot: string
    screenplay?: NullableJsonNullValueInput | InputJsonValue
    finalVideoUrl?: string | null
    driveFileId?: string | null
    driveShareLink?: string | null
    totalScenes?: number
    completedScenes?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    Asset?: AssetCreateNestedManyWithoutProjectInput
    AudioAsset?: AudioAssetCreateNestedManyWithoutProjectInput
    Scene?: SceneCreateNestedManyWithoutProjectInput
  }

  export type ProjectUncheckedCreateWithoutJobInput = {
    id?: string
    title: string
    status?: $Enums.ProjectStatus
    ide: string
    gaya: $Enums.StoryStyle
    tokohUtama: string
    asalDaerah: string
    latar: $Enums.HistoricalEra
    latarDetail?: string | null
    plot: string
    screenplay?: NullableJsonNullValueInput | InputJsonValue
    finalVideoUrl?: string | null
    driveFileId?: string | null
    driveShareLink?: string | null
    totalScenes?: number
    completedScenes?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    Asset?: AssetUncheckedCreateNestedManyWithoutProjectInput
    AudioAsset?: AudioAssetUncheckedCreateNestedManyWithoutProjectInput
    Scene?: SceneUncheckedCreateNestedManyWithoutProjectInput
  }

  export type ProjectCreateOrConnectWithoutJobInput = {
    where: ProjectWhereUniqueInput
    create: XOR<ProjectCreateWithoutJobInput, ProjectUncheckedCreateWithoutJobInput>
  }

  export type ProjectUpsertWithoutJobInput = {
    update: XOR<ProjectUpdateWithoutJobInput, ProjectUncheckedUpdateWithoutJobInput>
    create: XOR<ProjectCreateWithoutJobInput, ProjectUncheckedCreateWithoutJobInput>
    where?: ProjectWhereInput
  }

  export type ProjectUpdateToOneWithWhereWithoutJobInput = {
    where?: ProjectWhereInput
    data: XOR<ProjectUpdateWithoutJobInput, ProjectUncheckedUpdateWithoutJobInput>
  }

  export type ProjectUpdateWithoutJobInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    status?: EnumProjectStatusFieldUpdateOperationsInput | $Enums.ProjectStatus
    ide?: StringFieldUpdateOperationsInput | string
    gaya?: EnumStoryStyleFieldUpdateOperationsInput | $Enums.StoryStyle
    tokohUtama?: StringFieldUpdateOperationsInput | string
    asalDaerah?: StringFieldUpdateOperationsInput | string
    latar?: EnumHistoricalEraFieldUpdateOperationsInput | $Enums.HistoricalEra
    latarDetail?: NullableStringFieldUpdateOperationsInput | string | null
    plot?: StringFieldUpdateOperationsInput | string
    screenplay?: NullableJsonNullValueInput | InputJsonValue
    finalVideoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    driveFileId?: NullableStringFieldUpdateOperationsInput | string | null
    driveShareLink?: NullableStringFieldUpdateOperationsInput | string | null
    totalScenes?: IntFieldUpdateOperationsInput | number
    completedScenes?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Asset?: AssetUpdateManyWithoutProjectNestedInput
    AudioAsset?: AudioAssetUpdateManyWithoutProjectNestedInput
    Scene?: SceneUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateWithoutJobInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    status?: EnumProjectStatusFieldUpdateOperationsInput | $Enums.ProjectStatus
    ide?: StringFieldUpdateOperationsInput | string
    gaya?: EnumStoryStyleFieldUpdateOperationsInput | $Enums.StoryStyle
    tokohUtama?: StringFieldUpdateOperationsInput | string
    asalDaerah?: StringFieldUpdateOperationsInput | string
    latar?: EnumHistoricalEraFieldUpdateOperationsInput | $Enums.HistoricalEra
    latarDetail?: NullableStringFieldUpdateOperationsInput | string | null
    plot?: StringFieldUpdateOperationsInput | string
    screenplay?: NullableJsonNullValueInput | InputJsonValue
    finalVideoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    driveFileId?: NullableStringFieldUpdateOperationsInput | string | null
    driveShareLink?: NullableStringFieldUpdateOperationsInput | string | null
    totalScenes?: IntFieldUpdateOperationsInput | number
    completedScenes?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Asset?: AssetUncheckedUpdateManyWithoutProjectNestedInput
    AudioAsset?: AudioAssetUncheckedUpdateManyWithoutProjectNestedInput
    Scene?: SceneUncheckedUpdateManyWithoutProjectNestedInput
  }

  export type AssetCreateWithoutProjectInput = {
    id: string
    type: $Enums.AssetType
    name: string
    description: string
    imagePrompt: string
    imageUrl?: string | null
    status?: $Enums.JobStatus
    createdAt?: Date | string
    updatedAt: Date | string
  }

  export type AssetUncheckedCreateWithoutProjectInput = {
    id: string
    type: $Enums.AssetType
    name: string
    description: string
    imagePrompt: string
    imageUrl?: string | null
    status?: $Enums.JobStatus
    createdAt?: Date | string
    updatedAt: Date | string
  }

  export type AssetCreateOrConnectWithoutProjectInput = {
    where: AssetWhereUniqueInput
    create: XOR<AssetCreateWithoutProjectInput, AssetUncheckedCreateWithoutProjectInput>
  }

  export type AssetCreateManyProjectInputEnvelope = {
    data: AssetCreateManyProjectInput | AssetCreateManyProjectInput[]
    skipDuplicates?: boolean
  }

  export type AudioAssetCreateWithoutProjectInput = {
    id: string
    type: $Enums.AudioType
    sunoPrompt: string
    sunoJobId?: string | null
    audioUrl?: string | null
    lyrics?: string | null
    mood?: string | null
    genre?: string | null
    status?: $Enums.JobStatus
    createdAt?: Date | string
    updatedAt: Date | string
  }

  export type AudioAssetUncheckedCreateWithoutProjectInput = {
    id: string
    type: $Enums.AudioType
    sunoPrompt: string
    sunoJobId?: string | null
    audioUrl?: string | null
    lyrics?: string | null
    mood?: string | null
    genre?: string | null
    status?: $Enums.JobStatus
    createdAt?: Date | string
    updatedAt: Date | string
  }

  export type AudioAssetCreateOrConnectWithoutProjectInput = {
    where: AudioAssetWhereUniqueInput
    create: XOR<AudioAssetCreateWithoutProjectInput, AudioAssetUncheckedCreateWithoutProjectInput>
  }

  export type AudioAssetCreateManyProjectInputEnvelope = {
    data: AudioAssetCreateManyProjectInput | AudioAssetCreateManyProjectInput[]
    skipDuplicates?: boolean
  }

  export type JobCreateWithoutProjectInput = {
    id: string
    type: string
    status?: $Enums.JobStatus
    payload?: NullableJsonNullValueInput | InputJsonValue
    result?: NullableJsonNullValueInput | InputJsonValue
    error?: string | null
    attempts?: number
    createdAt?: Date | string
    updatedAt: Date | string
  }

  export type JobUncheckedCreateWithoutProjectInput = {
    id: string
    type: string
    status?: $Enums.JobStatus
    payload?: NullableJsonNullValueInput | InputJsonValue
    result?: NullableJsonNullValueInput | InputJsonValue
    error?: string | null
    attempts?: number
    createdAt?: Date | string
    updatedAt: Date | string
  }

  export type JobCreateOrConnectWithoutProjectInput = {
    where: JobWhereUniqueInput
    create: XOR<JobCreateWithoutProjectInput, JobUncheckedCreateWithoutProjectInput>
  }

  export type JobCreateManyProjectInputEnvelope = {
    data: JobCreateManyProjectInput | JobCreateManyProjectInput[]
    skipDuplicates?: boolean
  }

  export type SceneCreateWithoutProjectInput = {
    id: string
    sceneNumber: number
    title: string
    setting: string
    timeOfDay?: string | null
    action: string
    voiceOver: string
    musicMood?: string | null
    actors?: SceneCreateactorsInput | string[]
    imagePrompt?: string | null
    videoPrompt?: string | null
    cameraAngle?: string | null
    transition?: string | null
    storyboardUrl?: string | null
    clipUrl?: string | null
    durationSeconds?: number
    status?: $Enums.JobStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SceneUncheckedCreateWithoutProjectInput = {
    id: string
    sceneNumber: number
    title: string
    setting: string
    timeOfDay?: string | null
    action: string
    voiceOver: string
    musicMood?: string | null
    actors?: SceneCreateactorsInput | string[]
    imagePrompt?: string | null
    videoPrompt?: string | null
    cameraAngle?: string | null
    transition?: string | null
    storyboardUrl?: string | null
    clipUrl?: string | null
    durationSeconds?: number
    status?: $Enums.JobStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SceneCreateOrConnectWithoutProjectInput = {
    where: SceneWhereUniqueInput
    create: XOR<SceneCreateWithoutProjectInput, SceneUncheckedCreateWithoutProjectInput>
  }

  export type SceneCreateManyProjectInputEnvelope = {
    data: SceneCreateManyProjectInput | SceneCreateManyProjectInput[]
    skipDuplicates?: boolean
  }

  export type AssetUpsertWithWhereUniqueWithoutProjectInput = {
    where: AssetWhereUniqueInput
    update: XOR<AssetUpdateWithoutProjectInput, AssetUncheckedUpdateWithoutProjectInput>
    create: XOR<AssetCreateWithoutProjectInput, AssetUncheckedCreateWithoutProjectInput>
  }

  export type AssetUpdateWithWhereUniqueWithoutProjectInput = {
    where: AssetWhereUniqueInput
    data: XOR<AssetUpdateWithoutProjectInput, AssetUncheckedUpdateWithoutProjectInput>
  }

  export type AssetUpdateManyWithWhereWithoutProjectInput = {
    where: AssetScalarWhereInput
    data: XOR<AssetUpdateManyMutationInput, AssetUncheckedUpdateManyWithoutProjectInput>
  }

  export type AssetScalarWhereInput = {
    AND?: AssetScalarWhereInput | AssetScalarWhereInput[]
    OR?: AssetScalarWhereInput[]
    NOT?: AssetScalarWhereInput | AssetScalarWhereInput[]
    id?: StringFilter<"Asset"> | string
    projectId?: StringFilter<"Asset"> | string
    type?: EnumAssetTypeFilter<"Asset"> | $Enums.AssetType
    name?: StringFilter<"Asset"> | string
    description?: StringFilter<"Asset"> | string
    imagePrompt?: StringFilter<"Asset"> | string
    imageUrl?: StringNullableFilter<"Asset"> | string | null
    status?: EnumJobStatusFilter<"Asset"> | $Enums.JobStatus
    createdAt?: DateTimeFilter<"Asset"> | Date | string
    updatedAt?: DateTimeFilter<"Asset"> | Date | string
  }

  export type AudioAssetUpsertWithWhereUniqueWithoutProjectInput = {
    where: AudioAssetWhereUniqueInput
    update: XOR<AudioAssetUpdateWithoutProjectInput, AudioAssetUncheckedUpdateWithoutProjectInput>
    create: XOR<AudioAssetCreateWithoutProjectInput, AudioAssetUncheckedCreateWithoutProjectInput>
  }

  export type AudioAssetUpdateWithWhereUniqueWithoutProjectInput = {
    where: AudioAssetWhereUniqueInput
    data: XOR<AudioAssetUpdateWithoutProjectInput, AudioAssetUncheckedUpdateWithoutProjectInput>
  }

  export type AudioAssetUpdateManyWithWhereWithoutProjectInput = {
    where: AudioAssetScalarWhereInput
    data: XOR<AudioAssetUpdateManyMutationInput, AudioAssetUncheckedUpdateManyWithoutProjectInput>
  }

  export type AudioAssetScalarWhereInput = {
    AND?: AudioAssetScalarWhereInput | AudioAssetScalarWhereInput[]
    OR?: AudioAssetScalarWhereInput[]
    NOT?: AudioAssetScalarWhereInput | AudioAssetScalarWhereInput[]
    id?: StringFilter<"AudioAsset"> | string
    projectId?: StringFilter<"AudioAsset"> | string
    type?: EnumAudioTypeFilter<"AudioAsset"> | $Enums.AudioType
    sunoPrompt?: StringFilter<"AudioAsset"> | string
    sunoJobId?: StringNullableFilter<"AudioAsset"> | string | null
    audioUrl?: StringNullableFilter<"AudioAsset"> | string | null
    lyrics?: StringNullableFilter<"AudioAsset"> | string | null
    mood?: StringNullableFilter<"AudioAsset"> | string | null
    genre?: StringNullableFilter<"AudioAsset"> | string | null
    status?: EnumJobStatusFilter<"AudioAsset"> | $Enums.JobStatus
    createdAt?: DateTimeFilter<"AudioAsset"> | Date | string
    updatedAt?: DateTimeFilter<"AudioAsset"> | Date | string
  }

  export type JobUpsertWithWhereUniqueWithoutProjectInput = {
    where: JobWhereUniqueInput
    update: XOR<JobUpdateWithoutProjectInput, JobUncheckedUpdateWithoutProjectInput>
    create: XOR<JobCreateWithoutProjectInput, JobUncheckedCreateWithoutProjectInput>
  }

  export type JobUpdateWithWhereUniqueWithoutProjectInput = {
    where: JobWhereUniqueInput
    data: XOR<JobUpdateWithoutProjectInput, JobUncheckedUpdateWithoutProjectInput>
  }

  export type JobUpdateManyWithWhereWithoutProjectInput = {
    where: JobScalarWhereInput
    data: XOR<JobUpdateManyMutationInput, JobUncheckedUpdateManyWithoutProjectInput>
  }

  export type JobScalarWhereInput = {
    AND?: JobScalarWhereInput | JobScalarWhereInput[]
    OR?: JobScalarWhereInput[]
    NOT?: JobScalarWhereInput | JobScalarWhereInput[]
    id?: StringFilter<"Job"> | string
    projectId?: StringFilter<"Job"> | string
    type?: StringFilter<"Job"> | string
    status?: EnumJobStatusFilter<"Job"> | $Enums.JobStatus
    payload?: JsonNullableFilter<"Job">
    result?: JsonNullableFilter<"Job">
    error?: StringNullableFilter<"Job"> | string | null
    attempts?: IntFilter<"Job"> | number
    createdAt?: DateTimeFilter<"Job"> | Date | string
    updatedAt?: DateTimeFilter<"Job"> | Date | string
  }

  export type SceneUpsertWithWhereUniqueWithoutProjectInput = {
    where: SceneWhereUniqueInput
    update: XOR<SceneUpdateWithoutProjectInput, SceneUncheckedUpdateWithoutProjectInput>
    create: XOR<SceneCreateWithoutProjectInput, SceneUncheckedCreateWithoutProjectInput>
  }

  export type SceneUpdateWithWhereUniqueWithoutProjectInput = {
    where: SceneWhereUniqueInput
    data: XOR<SceneUpdateWithoutProjectInput, SceneUncheckedUpdateWithoutProjectInput>
  }

  export type SceneUpdateManyWithWhereWithoutProjectInput = {
    where: SceneScalarWhereInput
    data: XOR<SceneUpdateManyMutationInput, SceneUncheckedUpdateManyWithoutProjectInput>
  }

  export type SceneScalarWhereInput = {
    AND?: SceneScalarWhereInput | SceneScalarWhereInput[]
    OR?: SceneScalarWhereInput[]
    NOT?: SceneScalarWhereInput | SceneScalarWhereInput[]
    id?: StringFilter<"Scene"> | string
    projectId?: StringFilter<"Scene"> | string
    sceneNumber?: IntFilter<"Scene"> | number
    title?: StringFilter<"Scene"> | string
    setting?: StringFilter<"Scene"> | string
    timeOfDay?: StringNullableFilter<"Scene"> | string | null
    action?: StringFilter<"Scene"> | string
    voiceOver?: StringFilter<"Scene"> | string
    musicMood?: StringNullableFilter<"Scene"> | string | null
    actors?: StringNullableListFilter<"Scene">
    imagePrompt?: StringNullableFilter<"Scene"> | string | null
    videoPrompt?: StringNullableFilter<"Scene"> | string | null
    cameraAngle?: StringNullableFilter<"Scene"> | string | null
    transition?: StringNullableFilter<"Scene"> | string | null
    storyboardUrl?: StringNullableFilter<"Scene"> | string | null
    clipUrl?: StringNullableFilter<"Scene"> | string | null
    durationSeconds?: IntFilter<"Scene"> | number
    status?: EnumJobStatusFilter<"Scene"> | $Enums.JobStatus
    createdAt?: DateTimeFilter<"Scene"> | Date | string
    updatedAt?: DateTimeFilter<"Scene"> | Date | string
  }

  export type ProjectCreateWithoutSceneInput = {
    id?: string
    title: string
    status?: $Enums.ProjectStatus
    ide: string
    gaya: $Enums.StoryStyle
    tokohUtama: string
    asalDaerah: string
    latar: $Enums.HistoricalEra
    latarDetail?: string | null
    plot: string
    screenplay?: NullableJsonNullValueInput | InputJsonValue
    finalVideoUrl?: string | null
    driveFileId?: string | null
    driveShareLink?: string | null
    totalScenes?: number
    completedScenes?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    Asset?: AssetCreateNestedManyWithoutProjectInput
    AudioAsset?: AudioAssetCreateNestedManyWithoutProjectInput
    Job?: JobCreateNestedManyWithoutProjectInput
  }

  export type ProjectUncheckedCreateWithoutSceneInput = {
    id?: string
    title: string
    status?: $Enums.ProjectStatus
    ide: string
    gaya: $Enums.StoryStyle
    tokohUtama: string
    asalDaerah: string
    latar: $Enums.HistoricalEra
    latarDetail?: string | null
    plot: string
    screenplay?: NullableJsonNullValueInput | InputJsonValue
    finalVideoUrl?: string | null
    driveFileId?: string | null
    driveShareLink?: string | null
    totalScenes?: number
    completedScenes?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    Asset?: AssetUncheckedCreateNestedManyWithoutProjectInput
    AudioAsset?: AudioAssetUncheckedCreateNestedManyWithoutProjectInput
    Job?: JobUncheckedCreateNestedManyWithoutProjectInput
  }

  export type ProjectCreateOrConnectWithoutSceneInput = {
    where: ProjectWhereUniqueInput
    create: XOR<ProjectCreateWithoutSceneInput, ProjectUncheckedCreateWithoutSceneInput>
  }

  export type ProjectUpsertWithoutSceneInput = {
    update: XOR<ProjectUpdateWithoutSceneInput, ProjectUncheckedUpdateWithoutSceneInput>
    create: XOR<ProjectCreateWithoutSceneInput, ProjectUncheckedCreateWithoutSceneInput>
    where?: ProjectWhereInput
  }

  export type ProjectUpdateToOneWithWhereWithoutSceneInput = {
    where?: ProjectWhereInput
    data: XOR<ProjectUpdateWithoutSceneInput, ProjectUncheckedUpdateWithoutSceneInput>
  }

  export type ProjectUpdateWithoutSceneInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    status?: EnumProjectStatusFieldUpdateOperationsInput | $Enums.ProjectStatus
    ide?: StringFieldUpdateOperationsInput | string
    gaya?: EnumStoryStyleFieldUpdateOperationsInput | $Enums.StoryStyle
    tokohUtama?: StringFieldUpdateOperationsInput | string
    asalDaerah?: StringFieldUpdateOperationsInput | string
    latar?: EnumHistoricalEraFieldUpdateOperationsInput | $Enums.HistoricalEra
    latarDetail?: NullableStringFieldUpdateOperationsInput | string | null
    plot?: StringFieldUpdateOperationsInput | string
    screenplay?: NullableJsonNullValueInput | InputJsonValue
    finalVideoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    driveFileId?: NullableStringFieldUpdateOperationsInput | string | null
    driveShareLink?: NullableStringFieldUpdateOperationsInput | string | null
    totalScenes?: IntFieldUpdateOperationsInput | number
    completedScenes?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Asset?: AssetUpdateManyWithoutProjectNestedInput
    AudioAsset?: AudioAssetUpdateManyWithoutProjectNestedInput
    Job?: JobUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateWithoutSceneInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    status?: EnumProjectStatusFieldUpdateOperationsInput | $Enums.ProjectStatus
    ide?: StringFieldUpdateOperationsInput | string
    gaya?: EnumStoryStyleFieldUpdateOperationsInput | $Enums.StoryStyle
    tokohUtama?: StringFieldUpdateOperationsInput | string
    asalDaerah?: StringFieldUpdateOperationsInput | string
    latar?: EnumHistoricalEraFieldUpdateOperationsInput | $Enums.HistoricalEra
    latarDetail?: NullableStringFieldUpdateOperationsInput | string | null
    plot?: StringFieldUpdateOperationsInput | string
    screenplay?: NullableJsonNullValueInput | InputJsonValue
    finalVideoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    driveFileId?: NullableStringFieldUpdateOperationsInput | string | null
    driveShareLink?: NullableStringFieldUpdateOperationsInput | string | null
    totalScenes?: IntFieldUpdateOperationsInput | number
    completedScenes?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Asset?: AssetUncheckedUpdateManyWithoutProjectNestedInput
    AudioAsset?: AudioAssetUncheckedUpdateManyWithoutProjectNestedInput
    Job?: JobUncheckedUpdateManyWithoutProjectNestedInput
  }

  export type AssetCreateManyProjectInput = {
    id: string
    type: $Enums.AssetType
    name: string
    description: string
    imagePrompt: string
    imageUrl?: string | null
    status?: $Enums.JobStatus
    createdAt?: Date | string
    updatedAt: Date | string
  }

  export type AudioAssetCreateManyProjectInput = {
    id: string
    type: $Enums.AudioType
    sunoPrompt: string
    sunoJobId?: string | null
    audioUrl?: string | null
    lyrics?: string | null
    mood?: string | null
    genre?: string | null
    status?: $Enums.JobStatus
    createdAt?: Date | string
    updatedAt: Date | string
  }

  export type JobCreateManyProjectInput = {
    id: string
    type: string
    status?: $Enums.JobStatus
    payload?: NullableJsonNullValueInput | InputJsonValue
    result?: NullableJsonNullValueInput | InputJsonValue
    error?: string | null
    attempts?: number
    createdAt?: Date | string
    updatedAt: Date | string
  }

  export type SceneCreateManyProjectInput = {
    id: string
    sceneNumber: number
    title: string
    setting: string
    timeOfDay?: string | null
    action: string
    voiceOver: string
    musicMood?: string | null
    actors?: SceneCreateactorsInput | string[]
    imagePrompt?: string | null
    videoPrompt?: string | null
    cameraAngle?: string | null
    transition?: string | null
    storyboardUrl?: string | null
    clipUrl?: string | null
    durationSeconds?: number
    status?: $Enums.JobStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AssetUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumAssetTypeFieldUpdateOperationsInput | $Enums.AssetType
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    imagePrompt?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumJobStatusFieldUpdateOperationsInput | $Enums.JobStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AssetUncheckedUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumAssetTypeFieldUpdateOperationsInput | $Enums.AssetType
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    imagePrompt?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumJobStatusFieldUpdateOperationsInput | $Enums.JobStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AssetUncheckedUpdateManyWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumAssetTypeFieldUpdateOperationsInput | $Enums.AssetType
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    imagePrompt?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumJobStatusFieldUpdateOperationsInput | $Enums.JobStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AudioAssetUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumAudioTypeFieldUpdateOperationsInput | $Enums.AudioType
    sunoPrompt?: StringFieldUpdateOperationsInput | string
    sunoJobId?: NullableStringFieldUpdateOperationsInput | string | null
    audioUrl?: NullableStringFieldUpdateOperationsInput | string | null
    lyrics?: NullableStringFieldUpdateOperationsInput | string | null
    mood?: NullableStringFieldUpdateOperationsInput | string | null
    genre?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumJobStatusFieldUpdateOperationsInput | $Enums.JobStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AudioAssetUncheckedUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumAudioTypeFieldUpdateOperationsInput | $Enums.AudioType
    sunoPrompt?: StringFieldUpdateOperationsInput | string
    sunoJobId?: NullableStringFieldUpdateOperationsInput | string | null
    audioUrl?: NullableStringFieldUpdateOperationsInput | string | null
    lyrics?: NullableStringFieldUpdateOperationsInput | string | null
    mood?: NullableStringFieldUpdateOperationsInput | string | null
    genre?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumJobStatusFieldUpdateOperationsInput | $Enums.JobStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AudioAssetUncheckedUpdateManyWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumAudioTypeFieldUpdateOperationsInput | $Enums.AudioType
    sunoPrompt?: StringFieldUpdateOperationsInput | string
    sunoJobId?: NullableStringFieldUpdateOperationsInput | string | null
    audioUrl?: NullableStringFieldUpdateOperationsInput | string | null
    lyrics?: NullableStringFieldUpdateOperationsInput | string | null
    mood?: NullableStringFieldUpdateOperationsInput | string | null
    genre?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumJobStatusFieldUpdateOperationsInput | $Enums.JobStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type JobUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    status?: EnumJobStatusFieldUpdateOperationsInput | $Enums.JobStatus
    payload?: NullableJsonNullValueInput | InputJsonValue
    result?: NullableJsonNullValueInput | InputJsonValue
    error?: NullableStringFieldUpdateOperationsInput | string | null
    attempts?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type JobUncheckedUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    status?: EnumJobStatusFieldUpdateOperationsInput | $Enums.JobStatus
    payload?: NullableJsonNullValueInput | InputJsonValue
    result?: NullableJsonNullValueInput | InputJsonValue
    error?: NullableStringFieldUpdateOperationsInput | string | null
    attempts?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type JobUncheckedUpdateManyWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    status?: EnumJobStatusFieldUpdateOperationsInput | $Enums.JobStatus
    payload?: NullableJsonNullValueInput | InputJsonValue
    result?: NullableJsonNullValueInput | InputJsonValue
    error?: NullableStringFieldUpdateOperationsInput | string | null
    attempts?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SceneUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    sceneNumber?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    setting?: StringFieldUpdateOperationsInput | string
    timeOfDay?: NullableStringFieldUpdateOperationsInput | string | null
    action?: StringFieldUpdateOperationsInput | string
    voiceOver?: StringFieldUpdateOperationsInput | string
    musicMood?: NullableStringFieldUpdateOperationsInput | string | null
    actors?: SceneUpdateactorsInput | string[]
    imagePrompt?: NullableStringFieldUpdateOperationsInput | string | null
    videoPrompt?: NullableStringFieldUpdateOperationsInput | string | null
    cameraAngle?: NullableStringFieldUpdateOperationsInput | string | null
    transition?: NullableStringFieldUpdateOperationsInput | string | null
    storyboardUrl?: NullableStringFieldUpdateOperationsInput | string | null
    clipUrl?: NullableStringFieldUpdateOperationsInput | string | null
    durationSeconds?: IntFieldUpdateOperationsInput | number
    status?: EnumJobStatusFieldUpdateOperationsInput | $Enums.JobStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SceneUncheckedUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    sceneNumber?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    setting?: StringFieldUpdateOperationsInput | string
    timeOfDay?: NullableStringFieldUpdateOperationsInput | string | null
    action?: StringFieldUpdateOperationsInput | string
    voiceOver?: StringFieldUpdateOperationsInput | string
    musicMood?: NullableStringFieldUpdateOperationsInput | string | null
    actors?: SceneUpdateactorsInput | string[]
    imagePrompt?: NullableStringFieldUpdateOperationsInput | string | null
    videoPrompt?: NullableStringFieldUpdateOperationsInput | string | null
    cameraAngle?: NullableStringFieldUpdateOperationsInput | string | null
    transition?: NullableStringFieldUpdateOperationsInput | string | null
    storyboardUrl?: NullableStringFieldUpdateOperationsInput | string | null
    clipUrl?: NullableStringFieldUpdateOperationsInput | string | null
    durationSeconds?: IntFieldUpdateOperationsInput | number
    status?: EnumJobStatusFieldUpdateOperationsInput | $Enums.JobStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SceneUncheckedUpdateManyWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    sceneNumber?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    setting?: StringFieldUpdateOperationsInput | string
    timeOfDay?: NullableStringFieldUpdateOperationsInput | string | null
    action?: StringFieldUpdateOperationsInput | string
    voiceOver?: StringFieldUpdateOperationsInput | string
    musicMood?: NullableStringFieldUpdateOperationsInput | string | null
    actors?: SceneUpdateactorsInput | string[]
    imagePrompt?: NullableStringFieldUpdateOperationsInput | string | null
    videoPrompt?: NullableStringFieldUpdateOperationsInput | string | null
    cameraAngle?: NullableStringFieldUpdateOperationsInput | string | null
    transition?: NullableStringFieldUpdateOperationsInput | string | null
    storyboardUrl?: NullableStringFieldUpdateOperationsInput | string | null
    clipUrl?: NullableStringFieldUpdateOperationsInput | string | null
    durationSeconds?: IntFieldUpdateOperationsInput | number
    status?: EnumJobStatusFieldUpdateOperationsInput | $Enums.JobStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
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