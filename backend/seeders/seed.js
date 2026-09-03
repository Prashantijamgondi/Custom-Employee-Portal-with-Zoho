const { sequelize, User, Role, Permission } = require('../src/models');


async function seed() {
  try {
    await sequelize.sync({ force: true }); // Drop and recreate tables

    // 1. Create Roles
    const adminRole = await Role.create({ name: 'Admin' });
    const hrRole = await Role.create({ name: 'HR' });
    const salesRole = await Role.create({ name: 'Sales' });
    const supportRole = await Role.create({ name: 'Support' });
    const financeRole = await Role.create({ name: 'Finance' });

    // 2. Create Admin User
    // For a real app, use bcrypt to hash the password. Since it's a demo, we will use plain text or simple hash. Let's install bcryptjs for ease.
    const adminUser = await User.create({
      username: 'admin',
      password: 'password123', // In a real scenario, this MUST be hashed!
      name: 'System Admin'
    });

    await adminUser.addRole(adminRole);

    const hrUser = await User.create({
        username: 'hr',
        password: 'password123',
        name: 'HR User'
    });
    await hrUser.addRole(hrRole);

    const salesUser = await User.create({
        username: 'sales',
        password: 'password123',
        name: 'Sales User'
    });
    await salesUser.addRole(salesRole);

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Failed to seed database:', error);
    process.exit(1);
  }
}

seed();
