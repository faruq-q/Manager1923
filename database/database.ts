import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT) || 5432,
});

// Extracted interface for TypeScript type safety
export interface ServerConfig {
    guild_id: string;
    setup_user_id: string;
    bot_name: string | null;
    ea_sid: string;
    ea_remid: string;
    game_id: string | null;
    server_name: string | null;
    vban_channel_id: string | null;
    ban_channel_id: string | null;
    kick_channel_id: string | null;
    server_updates_channel_id: string | null;
    player_reports_channel_id: string | null;
    viewer_role_ids: string[] | null; 
}

// Function to initialize and verify database tables
export async function initDatabase() {
    // Aligned column names explicitly with managerSetupModal.ts UPSERT query
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS server_configs (
            guild_id VARCHAR(30) PRIMARY KEY,
            setup_user_id VARCHAR(30) NOT NULL,
            bot_name VARCHAR(255) DEFAULT 'Manager1923',
            ea_sid TEXT NOT NULL,
            ea_remid TEXT NOT NULL,
            game_id VARCHAR(30),
            server_name VARCHAR(100),
            vban_channel_id VARCHAR(30),
            ban_channel_id VARCHAR(30),
            kick_channel_id VARCHAR(30),
            server_updates_channel_id VARCHAR(30),
            player_reports_channel_id VARCHAR(30),
            viewer_role_ids TEXT[],
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `;

    try {
        const client = await pool.connect();
        await client.query(createTableQuery);
        console.log('📦 [DATABASE] PostgreSQL: Server configuration table verified successfully!');
        client.release();
    } catch (error) {
        console.error('❌ [DATABASE] PostgreSQL initialization failed:', error);
        process.exit(1); // Stop the bot if DB fails to connect
    }
}

export const db = {
    query: (text: string, params?: any[]) => pool.query(text, params),
};