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

// TypeScript için veri tipimizi (Haritayı) çıkarıyoruz
export interface ServerConfig {
    guild_id: string;
    sid: string;
    remid: string;
    game_id: string;
    server_name: string;
    admin_id: string;
    vban_channel_id: string | null;
    ban_channel_id: string | null;
    kick_channel_id: string | null;
    server_updates_channel_id: string | null;
    player_reports_channel_id: string | null;
    viewer_role_ids: string[] | null; // PostgreSQL ARRAY tipi TS'de string[] olur
}

// Detaylı tabloları başlatan fonksiyon
export async function initDatabase() {
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS server_configs (
            guild_id VARCHAR(30) PRIMARY KEY,
            sid TEXT NOT NULL,
            remid TEXT NOT NULL,
            game_id VARCHAR(30) NOT NULL,
            server_name VARCHAR(100),
            admin_id VARCHAR(30) NOT NULL,
            vban_channel_id VARCHAR(30),
            ban_channel_id VARCHAR(30),
            kick_channel_id VARCHAR(30),
            server_updates_channel_id VARCHAR(30),
            player_reports_channel_id VARCHAR(30),
            viewer_role_ids TEXT[], -- Rollerin dizisini tutuyoruz
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `;

    try {
        const client = await pool.connect();
        await client.query(createTableQuery);
        console.log('📦 PostgreSQL: Detaylı moderasyon tablosu başarıyla doğrulandı!');
        client.release();
    } catch (error) {
        console.error('❌ PostgreSQL başlatılırken hata oluştu:', error);
        process.exit(1);
    }
}

export const db = {
    query: (text: string, params?: any[]) => pool.query(text, params),
};