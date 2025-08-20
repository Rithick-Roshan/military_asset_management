create database military_asset_management;
use military_asset_management;

create table users(
      user_id int auto_increment primary key,
      username varchar(50) unique not null,
      email varchar(100) unique not null,
      password_hash varchar(255) not null,
      role enum('Admin','Base_Commander','Logistics_Officer') not null,
      base_id int,
	  status boolean default true
);

create table bases(
      base_id int auto_increment primary key,
      base_name varchar(100) not null,
      base_code varchar(10) unique not null,
      location varchar(200) not null
);


create table equipment_types(
    equipment_type_id int auto_increment primary key,
    epuipment_name varchar(100) not null,
    category enum('Weapons','Vehicles','Ammunition','Electronics','Medical','Communications','Others') not null,
    base_id int 
);

create table assets(
    asset_id int auto_increment primary key,
    asset_serial_number varchar(50) unique not null,
    equipment_type_id int not null,
    current_status enum('Available', 'Assigned', 'Expended', 'In_Transit', 'Under_Maintenance', 'Decommissioned') default 'Available',
    purchase_date date,
    purchase_price decimal(12,2),
    condition_status enum('Excellent', 'Good', 'Fair', 'Poor', 'Damaged') default 'Good',
    manufacturer varchar(100),
    model varchar(100),
    year_manufactured year,
    warranty_expiry date,
    available int,
    status enum('Sufficient','In-sufficient') default 'Sufficient',
    base_id int
);

create table transfers(
     transfer_id int auto_increment primary key,
     asset_id int not null,
     from_base_id int not null,
     to_base_id int not null,
     status varchar(10) not null,
     transfer_date date not null,
     quantity int not null check(quantity>0)
);

create table purchases(
   purchase_id int auto_increment primary key,
   purchase_order_number varchar(50) unique not null,
   asset_id int not null,
   base_id int not null,
   equipment_type_id int not null,
   quantity int not null check(quantity>0),
    unit_price decimal(10,2) not null check (unit_price > 0),
   total_amount decimal(12,2) not null check (total_amount > 0),
    purchase_date date not null,
	status enum('Pending', 'Approved', 'Ordered', 'Delivered', 'Cancelled') default 'Pending',
    supplier varchar(50) not null
);

create table assignments(
    assignment_id int auto_increment primary key,
    asset_id int not null,
    base_id int not null,
    Mission varchar(200) not null,
    status enum('Pending','Failed','Compeleted') default 'Pending'
);

create table expenditures(
     expenditure_id int auto_increment primary key,
     asset_id int not null,
     base_id int not null,
     reason varchar(200) not null,
     expenditure_date date not null
);


select * from users;
alter table bases
drop column commander_id;

select * from bases;
select * from assets;
select * from transfers;

update users
set  base_id=1
where user_id=1;

DELETE FROM users
WHERE user_id = 2;


alter table assets
add column asset_name varchar(100) not null, 
add column category enum('Weapons','Vehicles','Ammunition','Electronics','Medical','Communications','Others') not null;
  
alter table assets
drop column equipment_type_id;

delete from assets
where asset_id=1;

alter table assets
add column total_quantity int not null,
add column assigned int default 0;

alter table assignments
add column user_id int not null; 

DELETE FROM assets WHERE asset_id > 0;

select * from assets;

delete from assignments where assignment_id >0;

alter table assignments
add column userassigned int not null;

select * from purchases;

update assets
set asset_name="Assault Rifle S"
where asset_id=10;


