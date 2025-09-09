import {
  JSONRPCRequest,
  JSONRPCResponse,
  JSONRPCMessage,
  RequestId,
} from '@modelcontextprotocol/sdk/types.js';

export { JSONRPCRequest, JSONRPCResponse, JSONRPCMessage, RequestId };

/**
 * Response mode enum
 */
export type ResponseMode = 'stream' | 'batch';


/**
 * CORS configuration options for SSE transport
 */
export interface CORSConfig {
  /**
   * Access-Control-Allow-Origin header
   * @default "*"
   */
  allowOrigin?: string;

  /**
   * Access-Control-Allow-Methods header
   * @default "GET, POST, OPTIONS"
   */
  allowMethods?: string;

  /**
   * Access-Control-Allow-Headers header
   * @default "Content-Type, Authorization, x-api-key"
   */
  allowHeaders?: string;

  /**
   * Access-Control-Expose-Headers header
   * @default "Content-Type, Authorization, x-api-key"
   */
  exposeHeaders?: string;

  /**
   * Access-Control-Max-Age header for preflight requests
   * @default "86400"
   */
  maxAge?: string;
}

/**
 * Session configuration for HTTP Stream transport
 */
export interface SessionConfig {
  /**
   * Whether to enable session management
   * Default: true
   */
  enabled?: boolean;

  /**
   * Header name for session ID
   * Default: "Mcp-Session-Id"
   */
  headerName?: string;

  /**
   * Whether to allow client-initiated session termination
   * Default: true
   */
  allowClientTermination?: boolean;

  /**
   * Maximum number of concurrent sessions
   * Default: 100
   */
  maxConcurrentSessions?: number;

  /**
   * Session timeout in milliseconds
   * Default: 300000 (5 minutes)
   */
  sessionTimeout?: number;
}

/**
 * Configuration interface for the HTTP Stream transport
 */
export interface HttpStreamTransportConfig {
  /**
   * Port to run the HTTP server on, defaults to 8080
   */
  port?: number;

  /**
   * Endpoint path for MCP communication, defaults to "/mcp"
   */
  endpoint?: string;

  /**
   * Response mode: stream (Server-Sent Events) or batch (JSON)
   * Defaults to 'stream'
   */
  responseMode?: ResponseMode;

  /**
   * Timeout in milliseconds for batched messages
   * Only applies when responseMode is 'batch'
   */
  batchTimeout?: number;

  /**
   * Maximum message size in bytes
   */
  maxMessageSize?: number;

  /**
   * Session configuration
   */
  session?: SessionConfig;

  /**
   * Authentication configuration
   */
  auth?: any;

  /**
   * CORS configuration
   */
  cors?: any;
}

export const DEFAULT_SESSION_CONFIG: SessionConfig = {
  enabled: true,
  headerName: 'Mcp-Session-Id',
  allowClientTermination: true,
  maxConcurrentSessions: 100,
  sessionTimeout: 300000,
};

export const DEFAULT_HTTP_STREAM_CONFIG: HttpStreamTransportConfig = {
  port: 8080,
  endpoint: '/mcp',
  responseMode: 'stream',
  batchTimeout: 30000,
  maxMessageSize: 4 * 1024 * 1024,
  session: DEFAULT_SESSION_CONFIG,
};

/**
 * Default CORS configuration
 */
export const DEFAULT_CORS_CONFIG: CORSConfig = {
  allowOrigin: "*",
  allowMethods: "GET, POST, DELETE, OPTIONS",
  allowHeaders: "Content-Type, Accept, Authorization, x-api-key, Mcp-Session-Id, Last-Event-ID",
  exposeHeaders: "Content-Type, Authorization, x-api-key, Mcp-Session-Id",
  maxAge: "86400"
};
