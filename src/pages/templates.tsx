import React, { useEffect, useState } from "react";
import type { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import nextI18NextConfig from "../../next-i18next.config.js";
import { languages } from "../utils/languages";
import TemplateCard from "../components/templates/TemplateCard";
import FadeIn from "../components/motions/FadeIn";
import SearchBar from "../components/templates/TemplateSearch";
import DashboardLayout from "../layout/dashboard";
import { TEMPLATE_DATA } from "../components/templates/TemplateData";
import { getlisttemplate, savetemplate, updatetemplate } from '../services/user'
import { Form, Input, message, Modal, Select } from "antd";

const searchType = ['Health and Fitness', 'Creative and social', 'Academics and Professional', 'Other']

const Templates = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("");
  const [filteredData, setfilteredData] = useState<any[]>([]);
  const [list, setfList] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [row, setRow] = useState<any>();
  const [form] = Form.useForm();

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };
  async function init() {
    const res = await getlisttemplate()
    if (res.code === 200) {
      res.data.forEach((item) => {
        item.category = item.templateType
        item.promptTemplate = item.purpose
      })
      setfilteredData(res.data)
    }
  }
  useEffect(() => {
    init();
  }, [])
  useEffect(() => {
    const list = [...filteredData, ...TEMPLATE_DATA].filter((model) => {
      const matchQuery = model.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchCategory =
        category === "" || model.category.toLowerCase() === category.toLowerCase();
      return matchQuery && matchCategory;
    });
    setfList(list)
  }, [searchQuery, filteredData])
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleOk = () => {
    form.submit()
  };

  const onFinish = async (values: any) => {
    let res: any;
    if (!values.id) {
      res = await savetemplate(values)
    } else {
      res = await updatetemplate(values)
    }
    if (res.code === 200) {
      init()
      handleCancel()
      message.success(res.msg)

    } else {
      message.error(res.msg)
    }
  };
  return (
    <DashboardLayout>
      <div className="flex h-full w-full flex-col p-10">
        <FadeIn initialX={-45} initialY={0} delay={0.1}>
          <div>
            <h1 className="text-4xl font-bold text-white">Templates</h1>
            <h2 className="mb-4 text-xl font-thin text-white">
              Customizable and ready to deploy agents
            </h2>
          </div>
        </FadeIn>
        <FadeIn initialY={45} delay={0.1}>
          <SearchBar setSearchQuery={setSearchQuery} setCategory={setCategory} searchType={searchType}
            setRow={setRow} showModal={showModal} />
          <div className="grid grid-cols-1 justify-center gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {list.map((model, i) => (
              <TemplateCard key={model.name + model.description + i} model={model} init={init} setRow={setRow} showModal={showModal} />
            ))}
          </div>
        </FadeIn>
      </div>
      <Modal title={<div >{row ? "Add Template" : 'Edit Template'}</div>} open={isModalOpen}
        onCancel={handleCancel} destroyOnClose onOk={handleOk}
        width='50%'>
        <div style={{ margin: '50px 0' }}>
          <Form
            {...layout}
            form={form}
            name="control-hooks"
            onFinish={onFinish}
            style={{ maxWidth: 600 }}
            size='large'
            initialValues={row}
          >
            <Form.Item name="name" label="Template Name" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="purpose" label="Content" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="templateType" label="Type" rules={[{ required: true }]}>
              <Select allowClear   >
                {searchType.map(v => (<Select.Option value={v} key={v}>{v}</Select.Option>))}
              </Select>
            </Form.Item>
            <Form.Item name="description" label="Description" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="id" label="id" hidden>
              <Input />
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </DashboardLayout>
  );
};

export default Templates;

export const getStaticProps: GetStaticProps = async ({ locale = "en" }) => {
  const supportedLocales = languages.map((language) => language.code);
  const chosenLocale = supportedLocales.includes(locale) ? locale : "en";

  return {
    props: {
      ...(await serverSideTranslations(chosenLocale, nextI18NextConfig.ns)),
    },
  };
};
