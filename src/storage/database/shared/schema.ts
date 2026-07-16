import { pgTable, serial, timestamp, varchar, text, boolean, integer, index } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

export const healthCheck = pgTable("health_check", {
	id: serial().notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow(),
});

// 报名记录表 · 15th Round Hainan Regatta 2026
export const registrations = pgTable(
	"registrations",
	{
		id: varchar("id", { length: 36 }).primaryKey().default(sql`gen_random_uuid()`),
		entry_id: varchar("entry_id", { length: 32 }).notNull().unique(),
		team_name: varchar("team_name", { length: 200 }).notNull(),
		race_class: varchar("race_class", { length: 64 }).notNull(),
		skipper_name: varchar("skipper_name", { length: 128 }).notNull(),
		email: varchar("email", { length: 255 }).notNull(),
		phone: varchar("phone", { length: 64 }).notNull(),
		country: varchar("country", { length: 128 }),
		crew_count: varchar("crew_count", { length: 16 }),
		mmsi: varchar("mmsi", { length: 32 }),
		loa: varchar("loa", { length: 32 }),
		notes: text("notes"),
		has_insurance: boolean("has_insurance").notNull().default(false),
		has_safety: boolean("has_safety").notNull().default(false),
		status: varchar("status", { length: 32 }).notNull().default("pending"),
		lang: varchar("lang", { length: 8 }).default("en"),
		created_at: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
		updated_at: timestamp("updated_at", { withTimezone: true }),
	},
	(table) => [
		index("registrations_entry_id_idx").on(table.entry_id),
		index("registrations_email_idx").on(table.email),
		index("registrations_race_class_idx").on(table.race_class),
		index("registrations_created_at_idx").on(table.created_at),
		index("registrations_status_idx").on(table.status),
	]
);

// CMS · 新闻文章
export const cmsNews = pgTable(
	"cms_news",
	{
		id: varchar("id", { length: 36 }).primaryKey().default(sql`gen_random_uuid()`),
		slug: varchar("slug", { length: 128 }).notNull().unique(),
		title_en: varchar("title_en", { length: 300 }).notNull(),
		title_zh: varchar("title_zh", { length: 300 }),
		category: varchar("category", { length: 64 }).notNull().default("News"),
		published_at: timestamp("published_at", { withTimezone: true }).defaultNow().notNull(),
		image_url: text("image_url"),
		excerpt_en: text("excerpt_en"),
		excerpt_zh: text("excerpt_zh"),
		body_en: text("body_en"),
		body_zh: text("body_zh"),
		is_published: boolean("is_published").notNull().default(true),
		sort_order: integer("sort_order").notNull().default(0),
		created_at: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
		updated_at: timestamp("updated_at", { withTimezone: true }),
	},
	(table) => [
		index("cms_news_slug_idx").on(table.slug),
		index("cms_news_published_idx").on(table.is_published, table.published_at),
	]
);

// CMS · 全局键值设置（Hero 标语、联系方式等）
export const cmsSettings = pgTable(
	"cms_settings",
	{
		key: varchar("key", { length: 128 }).primaryKey(),
		value_en: text("value_en"),
		value_zh: text("value_zh"),
		description: varchar("description", { length: 300 }),
		updated_at: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
	}
);
