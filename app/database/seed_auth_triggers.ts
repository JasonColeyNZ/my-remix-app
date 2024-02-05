import type { PrismaClient } from "@prisma/client";

export const createAuthTriggers = async (prisma: PrismaClient) => {
  //Create Auth Triggers
  await prisma.$executeRaw`CREATE OR REPLACE FUNCTION public.create_user() RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public."User" (id, email)
  VALUES (NEW.id::uuid, NEW.email); 
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY definer;`;

  await prisma.$executeRaw`DROP TRIGGER IF EXISTS create_user_trigger ON auth.users;`;

  await prisma.$executeRaw`CREATE TRIGGER create_user_trigger AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.create_user();`;

  await prisma.$executeRaw`CREATE OR REPLACE FUNCTION public.update_user() RETURNS TRIGGER AS $$
BEGIN
  UPDATE public."User"
  SET email = NEW.email, "updatedAt" = NEW.updated_at
  WHERE id = NEW.id::uuid; 
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY definer;`;

  await prisma.$executeRaw`DROP TRIGGER IF EXISTS update_user_trigger ON auth.users;`;
  await prisma.$executeRaw`CREATE TRIGGER update_user_trigger AFTER UPDATE ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.update_user();`;

  await prisma.$executeRaw`CREATE OR REPLACE FUNCTION public.delete_user() RETURNS TRIGGER AS $$
BEGIN
  DELETE FROM public."User"
  WHERE id = OLD.id::uuid; 
  RETURN OLD;
END;
$$ LANGUAGE plpgsql SECURITY definer;`;

  await prisma.$executeRaw`DROP TRIGGER IF EXISTS delete_user_trigger ON auth.users;`;
  await prisma.$executeRaw`CREATE TRIGGER delete_user_trigger AFTER DELETE ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.delete_user();`;
};
